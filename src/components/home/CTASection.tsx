"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section className="relative py-32 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary text-primary-foreground" />
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-10" />
      <div className="container mx-auto max-w-4xl text-center relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-primary-foreground"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            You Belong Here
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience uplifting worship, inspiring messages, and a warm,
            welcoming community. Whether you&apos;re exploring faith for the
            first time or looking for a church home, we&apos;d love to meet you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow text-base"
            >
              <Link href="/events">Plan Your Visit</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-base"
            >
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
