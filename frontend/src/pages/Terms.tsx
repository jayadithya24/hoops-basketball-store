import Layout from "@/components/Layout";

const Terms = () => {
  return (
    <Layout>
      <div className="pt-40 px-6 max-w-3xl mx-auto text-foreground fade-up">

        {/* Gradient Heading */}
        <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Terms of Service
        </h1>

        <p className="mb-6 text-lg text-muted-foreground">
          By using the <strong>Hoops</strong> website, you agree to the following terms and conditions.
        </p>

        <hr className="border-border my-8" />

        <h2 className="text-2xl font-semibold mb-3">1. Usage Rules</h2>
        <p className="text-muted-foreground mb-6">
          You agree to use our services legally and responsibly without interfering
          with site operations or violating rights.
        </p>

        <h2 className="text-2xl font-semibold mb-3">2. Accounts</h2>
        <p className="text-muted-foreground mb-6">
          You are responsible for keeping your account credentials secure at all times.
        </p>

        <h2 className="text-2xl font-semibold mb-3">3. Purchases</h2>
        <p className="text-muted-foreground mb-6">
          All transactions must be authorized. Product prices and availability may change.
        </p>

        <h2 className="text-2xl font-semibold mb-3">4. Intellectual Property</h2>
        <p className="text-muted-foreground mb-6">
          All branding, content, and design elements are owned by Hoops and protected by law.
        </p>

        <h2 className="text-2xl font-semibold mb-3">5. Liability</h2>
        <p className="text-muted-foreground mb-6">
          We are not responsible for damages arising from misuse or external issues.
        </p>

        <h2 className="text-2xl font-semibold mb-3">6. Termination</h2>
        <p className="text-muted-foreground mb-6">
          Violations of these terms may result in account suspension or termination.
        </p>

        <h2 className="text-2xl font-semibold mb-3">7. Contact Us</h2>
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

export default Terms;
