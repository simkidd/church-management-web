"use client";
import { config } from "@/utils/config";
import { Calendar, Facebook, Instagram, Twitter } from "lucide-react";
import Logo from "./Logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark mt-10">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
              <Logo className="h-8" />
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight leading-4">
                  {config.SITE_NAME}
                </span>
                <span className="text-xs font-medium">
                  {config.BRANCH_NAME}
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
              A community dedicated to faith, hope, and love. Join us this
              Sunday.
            </p>

            <div className="flex gap-4">
              <a
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="sr-only">Facebook</span>
                <Facebook size={12} />
              </a>
              <a
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="sr-only">Instagram</span>
                <Instagram size={12} />
              </a>
              <a
                className="size-8 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center text-slate-400 hover:bg-primary hover:text-white transition-all"
                href="#"
              >
                <span className="sr-only">Twitter</span>
                <Twitter size={12} />
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">
              Ministries
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Kids &amp; Youth
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Small Groups
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Outreach
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Missions
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">
              Resources
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Sermon Archive
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Blog
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Member Portal
                </a>
              </li>
              <li>
                <a className="hover:text-primary transition-colors" href="#">
                  Give Online
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-4">
              Service Times
            </h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
              <li className="flex items-center gap-2">
                <Calendar size={16} />
                Sundays: 9:00 AM &amp; 11:00 AM
              </li>
              <li className="flex items-center gap-2">
                <Calendar size={16} />
                Wednesdays: 7:00 PM
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-6 text-sm uppercase tracking-wider">
              Visit Us
            </h4>
            <div className="space-y-3 text-sm text-slate-500 dark:text-slate-400">
              <p className="flex items-start gap-2">
                <Calendar
                  size={16}
                  className="mt-0.5"
                />
                <span>
                  123 Grace Blvd
                  <br />
                  Springfield, IL 62704
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} Grace Community Church. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a
              className="hover:text-slate-600 dark:hover:text-slate-200"
              href="#"
            >
              Privacy Policy
            </a>
            <a
              className="hover:text-slate-600 dark:hover:text-slate-200"
              href="#"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
