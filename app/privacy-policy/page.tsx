"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PageHero } from "@/components/page-hero";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="relative -top-21">
        <PageHero
          title="Privacy Policy"
          breadcrumb={[
            { label: "Home", href: "/" },
            { label: "Privacy Policy" },
          ]}
        />

        <section className="pt-20 md:pt-28 bg-white">
          <div className="container max-w-6xl mx-auto md:px-6 px-4 pb-20">
            <div className="prose prose-lg max-w-none space-y-8">
              <h2 className="text-2xl md:text-3xl font-bold mb-5">
                WHAT PERSONAL DATA WE COLLECT AND WHY WE COLLECT IT
              </h2>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">1. COMMENTS</h3>
                <p>
                  When visitors leave comments on the site we collect the data
                  shown in the comments form, and also the visitor's IP address
                  and browser user agent string to help spam detection. An
                  anonymized string created from your email address (also called
                  a hash) may be provided to the Gravatar service to see if you
                  are using it. The Gravatar service privacy policy is available
                  here:{" "}
                  <Link className="text-blue-500" href="/privacy-policy/">
                    https://www.bertandreconsulting.com/privacy-policy
                  </Link>
                  . After approval of your comment, your profile picture is
                  visible to the public in the context of your comment.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">2. MEDIA</h3>
                <p>
                  If you upload images to the website, you should avoid
                  uploading images with embedded location data (EXIF GPS)
                  included. Visitors to the website can download and extract any
                  location data from images on the website.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  3. CONTACT FORMS
                </h3>
                <p>
                  If you leave a comment on our site you may opt-in to saving
                  your name, email address and website in cookies. These are for
                  your convenience so that you do not have to fill in your
                  details again when you leave another comment. These cookies
                  will last for one year. If you have an account and you log in
                  to this site, we will set a temporary cookie to determine if
                  your browser accepts cookies. This cookie contains no personal
                  data and is discarded when you close your browser. When you
                  log in, we will also set up several cookies to save your login
                  information and your screen display choices. Login cookies
                  last for two days, and screen options cookies last for a year.
                  If you select "Remember Me", your login will persist for two
                  weeks. If you log out of your account, the login cookies will
                  be removed. If you edit or publish an article, an additional
                  cookie will be saved in your browser. This cookie includes no
                  personal data and simply indicates the post ID of the article
                  you just edited. It expires after 1 day.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  4. EMBEDDED CONTENT FROM OTHER WEBSITES
                </h3>
                <p>
                  Articles on this site may include embedded content (e.g.
                  videos, images, articles, etc.). Embedded content from other
                  websites behaves in the exact same way as if the visitor has
                  visited the other website. These websites may collect data
                  about you, use cookies, embed additional third-party tracking,
                  and monitor your interaction with that embedded content,
                  including tracing your interaction with the embedded content
                  if you have an account and are logged in to that website.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  5. HOW LONG WE RETAIN YOUR DATA
                </h3>
                <p>
                  If you leave a comment, the comment and its metadata are
                  retained indefinitely. This is so we can recognize and approve
                  any follow-up comments automatically instead of holding them
                  in a moderation queue. For users that register on our website
                  (if any), we also store the personal information they provide
                  in their user profile. All users can see, edit, or delete
                  their personal information at any time (except they cannot
                  change their username). Website administrators can also see
                  and edit that information.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  6. WHAT RIGHTS YOU HAVE OVER YOUR DATA
                </h3>
                <p>
                  If you have an account on this site, or have left comments,
                  you can request to receive an exported file of the personal
                  data we hold about you, including any data you have provided
                  to us. You can also request that we erase any personal data we
                  hold about you. This does not include any data we are obliged
                  to keep for administrative, legal, or security purposes.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-bold">
                  7. WHERE WE SEND YOUR DATA
                </h3>
                <p>
                  Visitor comments may be checked through an automated spam
                  detection service.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
