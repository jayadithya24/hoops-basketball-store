import Layout from "@/components/Layout";

const Privacy = () => {
  return (
    <Layout>
      <div className="pt-40 px-6 max-w-3xl mx-auto text-foreground fade-up">

        {/* Gradient Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          Privacy Policy
        </h1>

        <p className="mb-6 text-lg text-muted-foreground">
          At <strong>Hoops</strong>, we value your trust. This Privacy Policy explains how we
          collect, use, and protect your personal information.
        </p>

        {/* Section Divider */}
        <hr className="border-border my-8" />

        <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
        <p className="text-muted-foreground mb-6">
          We collect personal information such as your name, email, contact number,
          and usage data like browser type and browsing activity.
        </p>

        <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
        <p className="text-muted-foreground mb-6">
          Your data helps us process orders, enhance our website, communicate with
          you, and improve customer experience.
        </p>

        <h2 className="text-2xl font-semibold mb-3">3. Data Protection</h2>
        <p className="text-muted-foreground mb-6">
          We use secure authentication, encryption, and industry-standard protection
          methods to keep your data safe.
        </p>

        <h2 className="text-2xl font-semibold mb-3">4. Cookies</h2>
        <p className="text-muted-foreground mb-6">
          Cookies help personalize your experience and analyze website performance.
        </p>

        <h2 className="text-2xl font-semibold mb-3">5. Contact Us</h2>
        <p className="text-muted-foreground">
          Email: <strong>hello@hoops.com</strong> <br />
          Location: Los Angeles, CA
        </p>

        <p className="mt-10 text-sm text-muted-foreground">
          Last Updated: 2024
        </p>
      </div>
    </Layout>
  );
};

export default Privacy;
