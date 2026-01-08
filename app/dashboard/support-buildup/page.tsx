import { FlipCard } from "@/components/ui/flip-card";
import Image from "next/image";

export default function SupportBuildup() {
  return (
    <div className="space-y-6 w-full px-4">
      <h1 className="text-2xl font-bold text-primary">Support BuildUp</h1>

      <p className="text-foreground max-w-4xl">
        If you find BuildUp helpful and would like to support its development,
        any contribution is greatly appreciated. Hover over the card to see the
        QR code.
      </p>

      <div className="flex flex-wrap justify-center gap-3 pt-8">
        <FlipCard
          width="w-[220px]"
          height="h-[280px]"
          frontContent={
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">GCash</h2>
            </div>
          }
          backContent={
            <div className="p-4">
              <Image
                src="/images/qr/gcash.jpeg"
                alt="GCash QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="text-sm mt-2">Scan to donate</p>
            </div>
          }
        />
        <FlipCard
          width="w-[220px]"
          height="h-[280px]"
          frontContent={
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">Maya</h2>
            </div>
          }
          backContent={
            <div className="p-4">
              <Image
                src="/images/qr/maya.jpeg"
                alt="Maya QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="text-sm mt-2">Scan to donate</p>
            </div>
          }
        />
        <FlipCard
          width="w-[220px]"
          height="h-[280px]"
          frontContent={
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">MariBank</h2>
            </div>
          }
          backContent={
            <div className="p-4">
              <Image
                src="/images/qr/maribank.jpeg"
                alt="MariBank QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="text-sm mt-2">Scan to donate</p>
            </div>
          }
        />
        <FlipCard
          width="w-[220px]"
          height="h-[280px]"
          frontContent={
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">BPI</h2>
            </div>
          }
          backContent={
            <div className="p-4">
              <Image
                src="/images/qr/bpi.jpeg"
                alt="BPI QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="text-sm mt-2">Scan to donate</p>
            </div>
          }
        />
        <FlipCard
          width="w-[220px]"
          height="h-[280px]"
          frontContent={
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-primary">Landbank</h2>
            </div>
          }
          backContent={
            <div className="p-4">
              <Image
                src="/images/qr/landbank.jpeg"
                alt="Landbank QR Code"
                width={150}
                height={150}
                className="mx-auto"
              />
              <p className="text-sm mt-2">Scan to donate</p>
            </div>
          }
        />
      </div>

      <div className="text-center pt-16 pb-8">
        <p className="text-muted-foreground text-sm">
          Thank you for your support!
        </p>
      </div>
    </div>
  );
}
