"use client"
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

const CTASection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Join Us This Sunday
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Experience uplifting worship, inspiring messages, and a warm,
            welcoming community. We&apos;d love to see you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-glow"
            >
              <Link href="/events">View Service Times</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
            >
              <Link href="/contact">Get Directions</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
