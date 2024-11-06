import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, UserCheck, Clock, RefreshCw, Mail } from "lucide-react"
import { AppEmail, AppLogo } from "../../../../../const"
import Link from "next/link"

export default function Component() {
  return (
    <div className="bg-background py-8">
      <Card className="mx-auto max-w-4xl shadow-xl bg-secondary">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold ">Terms of Service</h1>
            <Image src={AppLogo} alt="Fintraz Logo" width={50} height={50} className="rounded-full" />
          </div>
          
          <div className="space-y-8">
            <section className=" p-6 rounded-lg ">
              <p className=" leading-relaxed">
                Thank you for choosing Fintraz! By using our app, you agree to comply with our Terms of Service outlined here.
              </p>
              
            </section>

            
              <div className="space-y-8">
                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                    1. Acceptance of Terms
                  </h2>
                  <p className=" leading-relaxed">
                    By downloading or using Fintraz, you agree to these Terms of Service. Please review them carefully, and discontinue use if you disagree.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <UserCheck className="w-6 h-6 mr-2 text-blue-600" />
                    2. User Responsibilities
                  </h2>
                  <p className=" leading-relaxed">
                    As a user of Fintraz, you are solely responsible for any data entered into the app. Avoid entering sensitive data, as Fintraz is designed for general expense tracking.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <Clock className="w-6 h-6 mr-2 text-yellow-600" />
                    3. Data Storage Limitations
                  </h2>
                  <p className=" leading-relaxed">
                    Fintraz temporarily stores your data locally on your device for up to 30 days. After this period, all data is automatically erased to maintain data privacy.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <RefreshCw className="w-6 h-6 mr-2 text-purple-600" />
                    4. Modifications
                  </h2>
                  <p className=" leading-relaxed">
                    We reserve the right to modify these terms at any time. Continued use of the app implies acceptance of any updated terms.
                  </p>
                  
                </section>

                <section className=" p-6 rounded-lg ">
                  <h2 className="text-xl font-semibold  mb-4 flex items-center">
                    <Mail className="w-6 h-6 mr-2 text-red-600" />
                    5. Contact Us
                  </h2>
                  <p className=" leading-relaxed">
                    For inquiries about these terms, reach out to us at{" "}
                    <Link href={`mailto:${AppEmail}`} className="text-primary-600 hover:underline">
                      {AppEmail}
                    </Link>
                    .
                  </p>
                  
                </section>
              </div>

            {/* <div className="flex items-center justify-end gap-4 pt-6 border-t">
              <Button variant="outline" className="">
                Decline
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                I Accept
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}