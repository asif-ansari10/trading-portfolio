"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import ThemeToggle from "./ThemeToggle";
import { useSession, signIn, signOut } from "next-auth/react";

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [showConnectModal, setShowConnectModal] = useState(false);

  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [passError, setPassError] = useState("");
  const [passSuccess, setPassSuccess] = useState("");

  // extra new state
  const [toastMsg, setToastMsg] = useState("");
  const [showToast, setShowToast] = useState(false);

  // show / hide password fields
  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  const [showPass3, setShowPass3] = useState(false);

  //change the name
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState(session?.user?.name || "");
  const [savingName, setSavingName] = useState(false);


  // password strength
  const getStrength = (pwd) => {
    let s = 0;
    if (pwd.length >= 6) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return s;
  };

  const dropdownRef = useRef(null);

  const links = [
    { name: "Home", href: "/" },
    { name: "Trades", href: "/trades" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Markets", href: "/markets" },
    { name: "About", href: "/about" },
  ];

  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Fallback Avatar
  const generateAvatar = (name = "U") =>
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name
    )}&background=2563eb&color=fff&bold=true`;

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/70 dark:bg-black/50 backdrop-blur-xl border-b shadow-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-blue-600 dark:text-blue-400"
          >
            Trading Portfolio
          </Link>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex gap-8">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-lg font-medium transition ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <span className="absolute left-0 -bottom-1 h-[3px] w-full bg-blue-600 dark:bg-blue-400 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-4">
            {/* Add Trade */}
            {session && (
              <button
                onClick={() => router.push("/trades/add")}
                className="hidden md:block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold"
              >
                + Add Trade
              </button>
            )}

            {/* Desktop Avatar Dropdown */}
            {!session ? (
              <button
                onClick={() => router.push("/login")}
                className="hidden md:block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-semibold"
              >
                Login / Register
              </button>
            ) : (
              <div className="relative hidden md:block" ref={dropdownRef}>
                <img
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  src={
                    session.user?.image || generateAvatar(session.user?.name)
                  }
                  className="w-10 h-10 rounded-full border cursor-pointer"
                  alt="avatar"
                />

                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-40 bg-white dark:bg-[#1b253a] border dark:border-gray-700 rounded-xl shadow-lg overflow-hidden">
                    <button
                      onClick={() => setShowProfilePopup(true)}
                      className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      Profile
                    </button>

                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}

            <ThemeToggle />

            {/* MOBILE MENU */}
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-3xl text-gray-700 dark:text-gray-200"
            >
              ☰
            </button>
          </div>
        </div>

        {/* MOBILE DROPDOWN */}
        {open && (
          <div className="md:hidden bg-white dark:bg-black border-t p-4 space-y-4">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block text-lg ${
                  pathname === item.href
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {session && (
              <button
                className="w-full py-2 bg-green-600 text-white rounded-lg"
                onClick={() => {
                  setOpen(false);
                  router.push("/trades/add");
                }}
              >
                + Add Trade
              </button>
            )}

            {session && (
              <button
                className="w-full py-2 bg-gray-700 text-white rounded-lg"
                onClick={() => {
                  setOpen(false);
                  setShowProfilePopup(true);
                }}
              >
                Profile
              </button>
            )}

            {!session ? (
              <button
                className="w-full py-2 bg-blue-600 text-white rounded-lg"
                onClick={() => {
                  setOpen(false);
                  router.push("/login");
                }}
              >
                Login / Register
              </button>
            ) : (
              <button
                className="w-full py-2 bg-red-600 text-white rounded-lg"
                onClick={() => {
                  setOpen(false);
                  signOut();
                }}
              >
                Logout
              </button>
            )}
          </div>
        )}
      </header>

      {/* PROFILE POPUP MODAL */}
      {showProfilePopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[999] animate-fadeIn">
          <div className="bg-white dark:bg-[#111827] w-[90%] max-w-md p-8 rounded-3xl shadow-2xl relative animate-slideUp">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
              onClick={() => setShowProfilePopup(false)}
            >
              ✕
            </button>

            {/* Avatar */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg overflow-hidden">
                <img
                  src={
                    session?.user?.image || generateAvatar(session?.user?.name)
                  }
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Name */}
            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100">
              {session?.user?.name}
            </h2>

            {/* Email */}
            <p className="text-center mt-1 text-gray-600 dark:text-gray-400">
              {session?.user?.email}
            </p>

            {/* Divider */}
            <div className="my-6 border-b border-gray-300 dark:border-gray-700"></div>

            {/* INFO DETAILS */}
            <div className="space-y-4">
              <div>
  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
    Full Name
  </label>

  <div className="relative">
    <input
      type="text"
      disabled={!isEditingName}
      className={`w-full p-3 mt-1 rounded-xl outline-none transition ${
        isEditingName
          ? "bg-white dark:bg-gray-800 text-black dark:text-white border border-blue-500"
          : "bg-gray-100 dark:bg-[#1f2937] text-gray-900 dark:text-gray-200"
      }`}
      value={fullName}
      onChange={(e) => setFullName(e.target.value)}
    />

    {/* Pencil Icon */}
    {!isEditingName && (
      <span
        className="absolute right-3 top-5 cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        onClick={() => setIsEditingName(true)}
      >
        ✏️
      </span>
    )}

    {/* Save Button */}
    {isEditingName && (
      <button
        className="absolute right-3 top-2 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm"
        onClick={async () => {
          setSavingName(true);

          const res = await fetch("/api/auth/update-name", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: session?.user?.email,
              name: fullName,
            }),
          });

          setSavingName(false);
          setIsEditingName(false);

          // Refresh session values
          router.refresh();

          // Toast
          setToastMsg("Name updated successfully!");
          setShowToast(true);
          setTimeout(() => setShowToast(false), 2500);
        }}
      >
        {savingName ? "Saving..." : "Save"}
      </button>
    )}
  </div>
</div>


              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <p className="p-3 mt-1 bg-gray-100 dark:bg-[#1f2937] rounded-xl text-gray-900 dark:text-gray-200">
                  {session?.user?.email}
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 space-y-3">
              {/* Change Password */}
              <button
                onClick={() => setShowPasswordPopup(true)}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold shadow hover:bg-blue-700 transition"
              >
                Change Password
              </button>

              {/* Logout */}
              <button
                onClick={() => signOut()}
                className="w-full py-3 bg-red-600 text-white rounded-xl font-semibold shadow hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CHANGE PASSWORD POPUP */}
      {/* CHANGE PASSWORD POPUP */}
      {showPasswordPopup && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[9999] animate-fadeIn">
          <div className="bg-white dark:bg-[#111827] w-[90%] max-w-md p-8 rounded-3xl shadow-2xl relative animate-slideUp">
            {/* Close Button */}
            <button
              className="absolute right-4 top-4 text-2xl text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition"
              onClick={() => {
                setShowPasswordPopup(false);
                setPassError("");
                setPassSuccess("");
                setCurrentPass("");
                setNewPass("");
                setConfirmPass("");
              }}
            >
              ✕
            </button>

            <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-6">
              Change Password
            </h2>

            {/* Error Message */}
            {passError && (
              <p className="text-red-500 text-center mb-3 animate-fadeIn">
                {passError}
              </p>
            )}

            {/* Success Message */}
            {passSuccess && (
              <p className="text-green-500 text-center mb-3 animate-fadeIn">
                {passSuccess}
              </p>
            )}

            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showPass1 ? "text" : "password"}
                    className="w-full p-3 mt-1 bg-gray-100 dark:bg-[#1f2937] rounded-xl text-gray-900 dark:text-gray-100 outline-none"
                    value={currentPass}
                    onChange={(e) => setCurrentPass(e.target.value)}
                  />

                  <span
                    className="absolute right-3 top-5 cursor-pointer text-gray-500"
                    onClick={() => setShowPass1(!showPass1)}
                  >
                    {showPass1 ? "👁️" : "🙈"}
                  </span>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showPass2 ? "text" : "password"}
                    className="w-full p-3 mt-1 bg-gray-100 dark:bg-[#1f2937] rounded-xl text-gray-900 dark:text-gray-100 outline-none"
                    value={newPass}
                    onChange={(e) => setNewPass(e.target.value)}
                  />

                  <span
                    className="absolute right-3 top-5 cursor-pointer text-gray-500"
                    onClick={() => setShowPass2(!showPass2)}
                  >
                    {showPass2 ? "👁️" : "🙈"}
                  </span>
                </div>

                {/* Password Strength Meter */}
                <div className="mt-2 w-full h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      getStrength(newPass) === 1
                        ? "bg-red-500 w-1/4"
                        : getStrength(newPass) === 2
                        ? "bg-yellow-500 w-1/2"
                        : getStrength(newPass) === 3
                        ? "bg-blue-500 w-3/4"
                        : getStrength(newPass) === 4
                        ? "bg-green-600 w-full"
                        : "w-0"
                    }`}
                  ></div>
                </div>
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={showPass3 ? "text" : "password"}
                    className="w-full p-3 mt-1 bg-gray-100 dark:bg-[#1f2937] rounded-xl text-gray-900 dark:text-gray-100 outline-none"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />

                  <span
                    className="absolute right-3 top-5 cursor-pointer text-gray-500"
                    onClick={() => setShowPass3(!showPass3)}
                  >
                    {showPass3 ? "👁️" : "🙈"}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={async () => {
                setPassError("");
                setPassSuccess("");

                if (!currentPass || !newPass || !confirmPass) {
                  setPassError("All fields are required.");
                  return;
                }

                if (newPass !== confirmPass) {
                  setPassError("New passwords do not match.");
                  return;
                }

                setLoadingPassword(true);

                try {
                  const res = await fetch("/api/auth/change-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email: session?.user?.email,
                      currentPass,
                      newPass,
                    }),
                  });

                  const data = await res.json();

                  if (!data.success) {
                    setPassError(data.message || "Error updating password.");
                    return;
                  }

                  // SUCCESS 🎉
                  setToastMsg("Password changed successfully!");
                  setShowToast(true);

                  // Toast stays for 3 sec → redirect after 1 sec (fast)
                  setTimeout(() => {
                    window.location.href = "/?passwordChanged=true";
                  }, 1000);

                  setTimeout(() => {
                    setShowToast(false);
                  }, 3000);
                } catch (err) {
                  setPassError("Something went wrong.");
                }

                setLoadingPassword(false);
              }}
              className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl font-semibold"
            >
              {loadingPassword ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      )}

      {showToast && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg text-lg z-[99999] animate-fadeIn">
          {toastMsg}
        </div>
      )}
    </>
  );
}
