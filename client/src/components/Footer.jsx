import React from 'react';
import { Link } from 'react-router-dom';
import { School, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center">
              <School className="text-blue-600 dark:text-blue-400" size={22} />
            </div>

            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Learning Paths
            </h2>
          </div>

          <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
            Structured academic learning for students preparing for school,
            competitive exams, and future success.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Quick Links
          </h3>

          <div className="flex flex-col gap-3">
            <Link
              to="/"
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600"
            >
              Home
            </Link>

            <Link
              to="/courses"
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600"
            >
              Courses
            </Link>

            <Link
              to="/about"
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600"
            >
              About
            </Link>

            <Link
              to="/contact"
              className="text-slate-500 dark:text-slate-400 hover:text-blue-600"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Support
          </h3>

          <div className="flex flex-col gap-3">
            <p className="text-slate-500 dark:text-slate-400">
              Academic Guidance
            </p>

            <p className="text-slate-500 dark:text-slate-400">
              Free Counseling
            </p>

            <p className="text-slate-500 dark:text-slate-400">
              Student Support
            </p>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
            Contact
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <Mail size={18} />
              <span>support@learningpaths.com</span>
            </div>

            <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
              <Phone size={18} />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-slate-800 py-5 text-center text-slate-500 dark:text-slate-400 text-sm">
        © 2026 Learning Paths. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
