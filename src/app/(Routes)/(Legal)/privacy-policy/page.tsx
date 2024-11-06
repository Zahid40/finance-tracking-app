import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Shield, Database, Lock, ExternalLink, RefreshCw, Mail } from "lucide-react"
import { AppEmail, AppLogo } from "../../../../../const"
import Link from "next/link"

export default function Component() {
  return (
    <div className="bg-background py-8">
      <Card className="mx-auto max-w-4xl shadow-xl bg-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold ">Privacy Policy</h1>
            <Image src={AppLogo} alt="Fintraz Logo" width={50} height={50} className="rounded-full" />
          </div>
          
          <div className="space-y-8">
            <section className=" p-6 rounded-lg ">
              <h2 className="text-xl font-semibold  mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2 text-blue-600" />
                Agreement to Terms
              </h2>
              <p className=" leading-relaxed">
                Welcome to Fintraz! Your privacy is extremely important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our app. By using Fintraz, you agree to the practices described here.
              </p>
              
            </section>

              <div className="space-y-8">
                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <Database className="w-6 h-6 mr-2 text-primary-600" />
                    Information Collection
                  </h2>
                  <p className=" leading-relaxed">
                    Fintraz does not actively collect or store your personal information. All transaction data you add is saved locally on your device and is only retained temporarily (for a maximum of 30 days) for enhanced user experience.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <Lock className="w-6 h-6 mr-2 text-red-600" />
                    Data Security
                  </h2>
                  <p className=" leading-relaxed">
                    While we ensure a high standard of security within the app, we advise users to avoid entering sensitive or personally identifiable information (PII). Since we don&apos;t store data beyond 30 days, we have minimized risks related to data breaches.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <ExternalLink className="w-6 h-6 mr-2 text-purple-600" />
                    Third-Party Services
                  </h2>
                  <p className=" leading-relaxed">
                    Fintraz doesn&apos;t integrate any third-party services that would have access to your data. The app is designed to operate independently without sharing your information.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <RefreshCw className="w-6 h-6 mr-2 text-yellow-600" />
                    Changes to the Privacy Policy
                  </h2>
                  <p className=" leading-relaxed">
                    We may occasionally update our Privacy Policy. You&apos;ll be notified of significant changes in the app, and continued usage implies acceptance of any revised terms.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-indigo-600" />
                    Contact Us
                  </h2>
                  <p className=" leading-relaxed">
                    For any questions or concerns about this Privacy Policy, please contact us at{" "}
                    <Link href={`mailto:${AppEmail}`} className="text-primary-600 hover:underline">
                      {AppEmail}
                    </Link>
                    .
                  </p>
                  
                </section>
              </div>

            {/* <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Button variant="outline" className="">
                Not right now
              </Button>
              <Button className="bg-primary-600 hover:bg-primary-700">
                I agree with terms
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}