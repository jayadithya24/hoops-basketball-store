import Layout from "@/components/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="pt-40 px-6 max-w-3xl mx-auto text-foreground">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>

        <p className="mb-4">
          Welcome to <strong>Hoops</strong>. By using our website, you agree to
          comply with the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Use of Website</h2>
        <p className="mb-4">
          You agree not to misuse our platform, attempt hacking, or engage in
          harmful activities.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. Account Responsibilities</h2>
        <p className="mb-4">
          You are responsible for keeping your account credentials secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Payments</h2>
        <p className="mb-4">
          All payments must be accurate and authorized. Secure transactions are
          processed via third-party gateways.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Refunds</h2>
        <p className="mb-4">
          Refunds may be issued for defective or incorrect products.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">5. Contact Us</h2>
        <p>
          Email: <strong>hello@hoops.com</strong> <br />
          Location: Los Angeles, CA
        </p>
      </div>
    </Layout>
  );
};

export default TermsOfService;
