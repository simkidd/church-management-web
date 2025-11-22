"use client";
import {
  Church,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";
import { config } from "@/utils/config";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <Link href="/" className="flex items-center gap-2 font-medium mb-4">
              <Logo className="h-8" />
              {config.SITE_NAME}
            </Link>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Inspiring faith and building community through worship, teaching,
              and service.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sermons"
                  className="text-primary-foreground/80 hover:text-gold transition-smooth text-sm"
                >
                  Sermons
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-primary-foreground/80 hover:text-gold transition-smooth text-sm"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-primary-foreground/80 hover:text-gold transition-smooth text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-primary-foreground/80 hover:text-gold transition-smooth text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-gold" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Faith Street, Hope City, HC 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" />
                <span className="text-primary-foreground/80 text-sm">
                  (555) 123-4567
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold" />
                <span className="text-primary-foreground/80 text-sm">
                  info@gracecommunity.org
                </span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">
              Connect With Us
            </h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground transition-smooth"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground transition-smooth"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground transition-smooth"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-primary-foreground/10 hover:bg-gold hover:text-gold-foreground transition-smooth"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
            <p className="text-primary-foreground/60 text-xs mt-6">
              © {currentYear} Grace Community Church. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
