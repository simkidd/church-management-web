"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

const WelcomeMessage = () => {
  return (
     <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auhref=format&fit=crop&w=800&q=80"
                alt="Pastor"
                className="rounded-2xl shadow-elevated"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                A Word from Our Pastor
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                "Welcome to Grace Community Church! Whether you're visiting for the first time or have been part of our
                family for years, we're grateful you're here. Our church is a place where everyone is welcome to
                encounter God's love, grow in faith, and find meaningful community."
              </p>
              <p className="text-lg font-semibold mb-2">Pastor Michael Johnson</p>
              <p className="text-muted-foreground mb-6">Senior Pastor</p>
              <Button asChild variant="outline">
                <Link href="/about">Meet Our Team</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
  )
}

export default WelcomeMessage