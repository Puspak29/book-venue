'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import deleteSession from "@/app/actions/deleteSession";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { useEffect, useRef, useState } from "react";
import { Building2, CalendarDays, ChevronDown, LogOut, MapPin, Menu, PlusCircle, Search, X } from "lucide-react";

function Header() {
  const router = useRouter();
  
  const { isAuth, setIsAuth, currUser, setCurrUser } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogOut = async () => {
    const { success, error } = await deleteSession();

    if(success) {
      setIsAuth(false);
      setCurrUser(null);
      setIsProfileOpen(false);
      router.push('/login');
    }
    else{
      toast.error(error);
    }
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-xl">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          
          {/* Left Side: Brand Icon & Desktop Navigation */}
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2.5 transition-all duration-300 hover:opacity-80 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-200 transition-transform group-hover:scale-110">
                <MapPin size={26} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight text-gray-900">
                BookVenue
              </span>
            </Link>

            {/* Enhanced Central Navigation */}
            <div className="hidden md:block">
              <div className="flex items-center gap-2">
                <Link
                  href="/"
                  className="group relative px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:text-indigo-600"
                >
                  <span className="flex items-center gap-2">
                    <Search size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                    Venues
                  </span>
                  <span className="absolute inset-x-4 -bottom-1 h-0.5 scale-x-0 bg-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />
                </Link>
                
                {isAuth && (
                  <>
                    <Link
                      href="/bookings"
                      className="group relative px-4 py-2 text-sm font-bold text-gray-600 transition-colors hover:text-indigo-600"
                    >
                      <span className="flex items-center gap-2">
                        <CalendarDays size={16} className="text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        Bookings
                      </span>
                      <span className="absolute inset-x-4 -bottom-1 h-0.5 scale-x-0 bg-indigo-600 transition-transform duration-300 group-hover:scale-x-100" />
                    </Link>

                    <div className="h-6 w-px bg-gray-200 mx-2" />

                    <Link
                      href="/venues/add"
                      className="flex items-center gap-2 rounded-full bg-indigo-50 px-5 py-2 text-sm font-bold text-indigo-700 transition-all hover:bg-indigo-100 hover:shadow-md active:scale-95"
                    >
                      <PlusCircle size={18} />
                      Add Venue
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right Side: Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            {!isAuth ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-bold text-gray-700 hover:text-indigo-600 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-gray-800 hover:shadow-gray-200 active:scale-95"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 rounded-full border border-gray-100 bg-white p-1.5 pr-4 shadow-sm transition-all hover:border-indigo-100 hover:shadow-md active:scale-95"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 text-sm font-bold text-white">
                    {currUser?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div className="flex flex-col items-start leading-tight">
                    <span className="text-sm font-bold text-gray-900">{currUser?.name}</span>
                    <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">Account Settings</span>
                  </div>
                  <ChevronDown size={14} className={`text-gray-400 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-gray-100 bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                    <div className="px-3 py-3 border-b border-gray-50 mb-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Signed in as</p>
                      <p className="text-sm font-medium text-gray-600 truncate">{currUser?.email || "user@example.com"}</p>
                    </div>
                    
                    {/* <Link href="/profile" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                      <User size={18} className="text-gray-400" />
                      View Profile
                    </Link> */}
                    
                    <Link href="/venues/mylist" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                      <Building2 size={18} className="text-gray-400" />
                      My Venues
                    </Link>

                    {/* <Link href="/settings" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                      <Settings size={18} className="text-gray-400" />
                      Settings
                    </Link> */}

                    <div className="my-1 h-px bg-gray-100" />
                    
                    <button
                      onClick={handleLogOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center rounded-xl p-2.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-2 px-4 pb-8 pt-4 border-t border-gray-100">
          
          {isAuth && (
            <div className="flex items-center gap-4 px-4 py-4 bg-gray-50 rounded-2xl mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white font-bold">
                {currUser?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <p className="font-bold text-gray-900">{currUser?.name || "User"}</p>
                <p className="text-xs text-gray-500">{currUser?.email || "user@example.com"}</p>
              </div>
            </div>
          )}

          <Link
            href="/"
            className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-bold text-gray-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
          >
            <Search size={20} />
            Explore Venues
          </Link>
          
          {isAuth ? (
            <>
              <Link
                href="/bookings"
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-bold text-gray-800 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
              >
                <CalendarDays size={20} />
                My Bookings
              </Link>
              <Link
                href="/venues/add"
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-bold text-indigo-700 bg-indigo-50"
              >
                <PlusCircle size={20} />
                Add New Venue
              </Link>
              <Link
                href="/venues/mylist"
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-base font-bold text-gray-800 hover:bg-indigo-50"
              >
                <Building2 size={20} />
                My Venues
              </Link>
              <button
                onClick={handleLogOut}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-4 text-base font-bold text-red-600 bg-red-50"
              >
                <LogOut size={20} />
                Sign Out
              </button>
            </>
          ) : (
            <div className="pt-4 flex flex-col gap-3">
              <Link
                href="/login"
                className="flex items-center justify-center rounded-xl px-4 py-4 text-base font-bold text-gray-700 border border-gray-200"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center rounded-xl px-4 py-4 text-base font-bold bg-indigo-600 text-white shadow-lg shadow-indigo-100"
              >
                Create Account
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
