import PageBanner from "@/components/client/page-banner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MapPinIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";

const Contact02Page = () => {
  const breadcrumbs = [{ label: "Liên Hệ" }];

  return (
    <>
      <PageBanner title="Liên Hệ" breadcrumbs={breadcrumbs} />

      <div className="min-h-screen flex justify-center py-4">
        <div className="w-full max-w-screen-xl mx-auto px-4">
          <b className="text-muted-foreground">Contact Us</b>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
            Chat to our friendly team
          </h2>
          <p className="mt-3 text-base sm:text-lg">
            We&apos;d love to hear from you. Please fill out this form or shoot
            us an email.
          </p>
          <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
              <div>
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                  <MailIcon />
                </div>
                <h3 className="mt-6 font-semibold text-xl">Email</h3>
                <p className="my-2.5 text-muted-foreground">
                  Our friendly team is here to help.
                </p>
                <Link
                  className="font-medium text-primary"
                  href="mailto:akashmoradiya3444@gmail.com"
                >
                  akashmoradiya3444@gmail.com
                </Link>
              </div>
              <div>
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                  <MessageCircle />
                </div>
                <h3 className="mt-6 font-semibold text-xl">Live chat</h3>
                <p className="my-2.5 text-muted-foreground">
                  Our friendly team is here to help.
                </p>
                <Link className="font-medium text-primary" href="#">
                  Start new chat
                </Link>
              </div>
              <div>
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                  <MapPinIcon />
                </div>
                <h3 className="mt-6 font-semibold text-xl">Office</h3>
                <p className="my-2.5 text-muted-foreground">
                  Come say hello at our office HQ.
                </p>
                <Link
                  className="font-medium text-primary"
                  href="https://map.google.com"
                  target="_blank"
                >
                  100 Smith Street Collingwood <br /> VIC 3066 AU
                </Link>
              </div>
              <div>
                <div className="h-12 w-12 flex items-center justify-center bg-primary/10 text-primary rounded-full">
                  <PhoneIcon />
                </div>
                <h3 className="mt-6 font-semibold text-xl">Phone</h3>
                <p className="my-2.5 text-muted-foreground">
                  Mon-Fri from 8am to 5pm.
                </p>
                <Link
                  className="font-medium text-primary"
                  href="tel:akashmoradiya3444@gmail.com"
                >
                  +1 (555) 000-0000
                </Link>
              </div>
            </div>

            {/* Form */}
            <Card className="bg-accent shadow-none">
              <CardContent className="p-6 md:p-10">
                <form>
                  <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        placeholder="First name"
                        id="firstName"
                        className="mt-1.5 bg-white h-11 shadow-none"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        placeholder="Last name"
                        id="lastName"
                        className="mt-1.5 bg-white h-11 shadow-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="mt-1.5 bg-white h-11 shadow-none"
                      />
                    </div>
                    <div className="col-span-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Message"
                        className="mt-1.5 bg-white shadow-none"
                        rows={6}
                      />
                    </div>
                    <div className="col-span-2 flex items-center gap-2">
                      <Checkbox id="acceptTerms" />
                      <Label htmlFor="acceptTerms">
                        You agree to our{" "}
                        <Link href="#" className="underline">
                          terms and conditions
                        </Link>
                        .
                      </Label>
                    </div>
                  </div>
                  <Button className="mt-6 w-full" size="lg">
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact02Page;
