import Layout from "@/components/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="pt-40 px-6 max-w-3xl mx-auto text-foreground">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>

        <p className="mb-4">
          At <strong>Hoops</strong>, we value your privacy and are committed to
          protecting your personal information. This Privacy Policy explains how
          we collect, use, and safeguard your data.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">1. Information We Collect</h2>
        <p className="mb-4">
          We may collect personal information such as name, email, contact
          number, and non-personal data like browser type and usage statistics.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">2. How We Use Your Information</h2>
        <p className="mb-4">
          We use your information to improve our services, process orders,
          provide support, and enhance user experience.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">3. Data Protection</h2>
        <p className="mb-4">
          We use encryption, authentication, and secure systems to protect your
          data, but no method is 100% secure.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">4. Cookies</h2>
        <p className="mb-4">
          Cookies help us analyze traffic and personalize user experience. You
          may disable cookies in your browser.
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

export default PrivacyPolicy;
