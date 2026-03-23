import { Link } from "react-router-dom";
import { Cloud, Shield, Zap, ArrowRight, Copy, FileDown } from "lucide-react";

const Landing = () => (
  <div className="min-h-screen bg-hero text-hero-foreground">
    <header className="flex items-center justify-between px-6 md:px-12 py-5">
      <div className="flex items-center gap-2">
        <Cloud className="h-7 w-7 text-primary" />
        <span className="text-xl font-bold tracking-tight">CloudVault</span>
      </div>
      <div className="flex items-center gap-3">
        <Link
          to="/login"
          className="px-5 py-2 text-sm font-medium rounded-lg border border-border/20 hover:bg-muted/10 transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="px-5 py-2 text-sm font-medium rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
        >
          Sign Up
        </Link>
      </div>
    </header>

    <section className="flex flex-col items-center justify-center text-center px-6 pt-24 pb-32">
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-8">
        <Zap className="h-4 w-4" />
        Smart Cloud Storage
      </div>
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-3xl leading-tight">
        Your files, <span className="text-primary">secured</span> &amp; optimized
      </h1>
      <p className="mt-6 text-lg md:text-xl max-w-xl text-muted-foreground">
        Secure cloud storage with smart optimization. Upload, organize, and access your files from anywhere.
      </p>
      <div className="flex gap-4 mt-10">
        <Link
          to="/signup"
          className="inline-flex items-center gap-2 px-7 py-3 text-base font-semibold rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
        >
          Get Started <ArrowRight className="h-5 w-5" />
        </Link>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-7 py-3 text-base font-semibold rounded-xl border border-border/20 hover:bg-muted/10 transition-colors"
        >
          Login
        </Link>
      </div>
    </section>

    <section className="max-w-5xl mx-auto px-6 pb-24 flex flex-col items-center gap-6">
      <div className="grid md:grid-cols-3 gap-6 w-full">
        {[
          { icon: Shield, title: "Secure Storage", desc: "Your files are encrypted and protected." },
          { icon: Zap, title: "Fast Uploads", desc: "Blazing fast file uploads and downloads." },
          { icon: Cloud, title: "Access Anywhere", desc: "Access your files from any device, anytime." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border/10 bg-muted/5 p-6">
            <Icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6 max-w-[calc(66.666%+0.75rem)]">
        {[
          { icon: Copy, title: "Deduplication", desc: "Automatically detects and removes duplicate files to save storage space." },
          { icon: FileDown, title: "Smart Compressibility", desc: "Intelligently compresses files without losing quality, optimizing your storage." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="rounded-xl border border-border/10 bg-muted/5 p-6">
            <Icon className="h-8 w-8 text-primary mb-3" />
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default Landing;
