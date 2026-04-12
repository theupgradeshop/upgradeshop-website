"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Container } from "./container";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./language-switcher";
import { Menu, X, ArrowRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnnouncementBar } from "@/components/announcement-bar";

const navLinks = [
  { href: "#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnnouncementBar />
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300 bg-background",
          isScrolled
            ? "border-b border-border shadow-sm"
            : ""
        )}
      >
      <Container>
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/brand/logo/logo_webp/upgrade_shop_logo_black_on_cream-_no_bg.webp"
              alt="The Upgrade Shop"
              width={844}
              height={378}
              className="h-14 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground/80 hover:text-foreground font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="https://wa.me/message/..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Chat</span>
            </Link>
            <LanguageSwitcher />
            <Button
              asChild
              className="bg-gold hover:bg-gold-dark text-foreground font-medium rounded-xl"
            >
              <Link href="/pricing">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 hover:bg-sand rounded-lg transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border py-6 bg-background">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-gold-dark font-medium py-2 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <LanguageSwitcher variant="mobile" />
                <Link
                  href="https://wa.me/message/..."
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-foreground/70 py-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span className="font-medium">Chat with us</span>
                </Link>
                <Button
                  asChild
                  className="bg-gold hover:bg-gold-dark text-foreground font-medium rounded-xl w-full"
                >
                  <Link
                    href="/pricing"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </Container>
      </header>
    </>
  );
}
