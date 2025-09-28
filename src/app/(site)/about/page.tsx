export const metadata = {
  title: "About",
};

import Image from "next/image";

export default function AboutPage() {
  return (
    <section className="py-10 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">About</h1>
      <div className="flex items-center gap-6">
        <div className="h-28 w-28 rounded-full overflow-hidden border">
          <Image src="/profile.jpg" alt="Joel Torres" width={224} height={224} className="h-full w-full object-cover" />
        </div>
        <p className="text-foreground/80 max-w-2xl">
          I’m Joel Torres — MIS student and backend automation builder. I moved from sales
          into tech and now run JAT Digital, focusing on AI automation and Microsoft 365.
          This site documents my journey and work, including the FFC case study.
        </p>
      </div>
      <div className="mt-8 space-y-2">
        <h2 className="font-semibold">Milestones</h2>
        <ul className="list-disc pl-6 space-y-1 text-foreground/80">
          <li>Transitioned from Sales to Tech</li>
          <li>Founded JAT Digital</li>
          <li>Built FFC AI Onboarding Automation</li>
        </ul>
      </div>
    </section>
  );
}


