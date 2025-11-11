"use client"
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Link from "next/link";

const OurMission = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            At Grace Community Church, we are committed to inspiring faith,
            building community, and serving with love. Through powerful worship,
            biblical teaching, and compassionate outreach, we aim to transform
            lives and glorify God in everything we do.
          </p>
          <Button asChild size="lg" className="gradient-gold shadow-glow">
            <Link href="/about">Learn More About Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default OurMission;
