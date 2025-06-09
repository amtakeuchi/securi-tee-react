import { FaAws, FaWindows, FaPython, FaLinux, FaGithub } from 'react-icons/fa';
import { SiSplunk, SiMicrosoftazure, SiVmware, SiCisco, SiFortinet } from 'react-icons/si';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Introduction Section */}
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="text-lg leading-relaxed mb-6">
          Hey! Nice to meet you. My name is Adam, and this is my personal website. I use it to share the projects I've been working on, 
          talk about events, trends, and issues in the cybersecurity/IT landscape, and share what's going on in my mind through blog posts.
        </p>
      </section>

      {/* What I Do Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">What I Actually Do</h2>
        <p className="text-lg leading-relaxed mb-6">
          I'm an IT professional who specializes in cybersecurity, particularly in the Cloud, SOC, and penetration testing fields. 
          What sets me apart? I bridge gaps. Having worked alongside (and learned from) everyone from developers to executives to janitors, 
          I understand that not all threats are virtual. The soft skills I've honed let me translate tech into action, and action into results. 
          Because at the end of the day, cybersecurity isn't just about systems; it's about people.
        </p>
        <p className="text-lg leading-relaxed mb-6">
          But the thing is, I didn't start out dreaming in code. I got into this because I was curious, stubborn, and apparently enjoy 
          mild torture in the form of troubleshooting complex technical problems at 2 AM.
        </p>
      </section>

      {/* Professional Background */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">My Professional Background</h2>
        <p className="text-lg leading-relaxed mb-6">
          I hold a diploma (Associate's Degree for anyone viewing this from the US) in Cyber Defence and Cloud Administration from the 
          Manitoba Institute of Trades & Technology, where I graduated with a 3.8 GPA and a 5th place finish in the Skills Manitoba IT Competition.
        </p>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold mb-2">Certifications</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>CompTIA Security+</li>
            <li>TryHackMe SOC Analyst Level 1</li>
            <li>Amazon Web Services Cloud Essentials</li>
            <li>Fortinet Certified Associate Cybersecurity</li>
          </ul>
        </div>
        <p className="text-lg leading-relaxed">
          My experience spans from hands-on client support and security incident response to developing web solutions that drive user engagement. 
          I've successfully managed high-volume technical support scenarios, authored comprehensive incident response plans, assisted with 
          forensic investigations, and delivered security solutions that protect client systems while maintaining operational efficiency.
        </p>
      </section>

      {/* Skills Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-6">The Skills I've Picked Up Along The Way</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {/* Security Operations */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Security Operations & Analysis</h3>
            <ul className="space-y-2">
              <li>• SOC analysis (Splunk, Wazuh, ELK Stack)</li>
              <li>• Incident response and forensics</li>
              <li>• Network analysis (Wireshark, Zeek)</li>
              <li>• Threat intelligence and malware analysis</li>
              <li>• MITRE ATT&CK framework</li>
            </ul>
          </div>

          {/* Infrastructure & Cloud */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Infrastructure & Cloud</h3>
            <ul className="space-y-2">
              <li>• AWS and Microsoft Azure administration</li>
              <li>• Windows Server and Active Directory</li>
              <li>• VMware vSphere and ESXi</li>
              <li>• Cisco networking</li>
              <li>• FortiGate firewalls and VPN</li>
            </ul>
          </div>

          {/* Development */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Development & Automation</h3>
            <ul className="space-y-2">
              <li>• Python programming</li>
              <li>• Web development</li>
              <li>• Linux administration</li>
              <li>• Network automation</li>
              <li>• Data visualization (R, Tableau)</li>
            </ul>
          </div>

          {/* Soft Skills */}
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-2xl font-semibold mb-4">Professional Skills</h3>
            <ul className="space-y-2">
              <li>• Project management</li>
              <li>• Technical writing</li>
              <li>• Customer service and support</li>
              <li>• Crisis management</li>
              <li>• Business acumen and risk management</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why I Do This */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold mb-4">Why I Do This</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <p className="text-lg leading-relaxed mb-4">
            Money. HAHAHA nah I'm kidding, every field pays well enough if you perform better than everyone else. 
            There are a couple of real reasons why I do this:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4">
            <li>Everyone needs it</li>
            <li>Not everyone can do it</li>
            <li>I enjoy the challenge and problem solving aspects of it</li>
          </ul>
          <p className="text-lg leading-relaxed mb-4">
            Every problem is different, requiring a unique solution, and there's something really satisfying about taking 
            something not so great and making it work better than before.
          </p>
          <p className="text-lg leading-relaxed">
            I've learned that creation isn't about flawless execution; it's about being willing to try something, holding on 
            and adapting when things inevitably go wrong, and having the resolve to see things through. It's the same as the gym, 
            it's the same as learning new skills, it's the same as romance: do your best, use the best intentions, know that 
            things go wrong and that it's okay, and what some would consider "failure" is actually a success (failure is only 
            failure when you quit on something that could have been successful).
          </p>
        </div>
      </section>

      {/* What's Next */}
      <section>
        <h2 className="text-3xl font-semibold mb-4">What's Next</h2>
        <p className="text-lg leading-relaxed mb-6">
          I'm always working on something new, learning something I didn't know yesterday, and am always up for the next challenge. 
          Whether building a website (like this one), securing a cloud network, or crafting a new tool to crack a system open, I'm here for it.
        </p>
        <p className="text-lg leading-relaxed">
          I'm eager to dive into cybersecurity and join the battle against threat actors, whether it's working with cloud environments, 
          hunting down threats in a SOC team, breaking (then fixing) systems as a pentester, or responding to incidents while under pressure. 
          If your team needs a junior professional who is hungry to learn and even hungrier to improve, let's talk. Reach out to me on the 
          contact page, or message me directly through my LinkedIn (click the icon at the bottom of the page).
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
  