import React from "react";

// @ts-expect-error module resolution can't find md
import Oss from "./oss.md";
import { components } from "../../components/mdx-components";
import Layout from "../../components/layout";

export const metadata = {
  title: "OSS",
  description:
    "At Bedrock we strongly believe in open source. We push our team members to publish their work and demand the same for our contractors.",
};

const Page = () => {
  return (
    <Layout>
      <section
        className={"bg-black text-white shadow-2xl p-[9%] font-bold text-4xl"}
        style={{ backgroundImage: "url(/images/common/banner_xl.jpg)" }}
      >
        <h1 className={"text-center my-5"}>OSS</h1>
      </section>
      <main className="max-w-2xl mx-auto container">
        <Oss components={components} />
      </main>
    </Layout>
  );
};

export default Page;
