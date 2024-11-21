import React from 'react';
import { PackageCheck, Link, Coins, CheckCircle } from 'lucide-react';

const steps = [
  {
    title: 'Connect Your Wallet',
    description: 'Link your wallet of choice to the platform',
    icon: Link,
  },
  {
    title: 'Start Transacting',
    description: 'Send Ethereum on your network of choice with just a few clicks',
    icon: Coins,
  },
  {
    title: 'Confirm Transaction',
    description: 'Review and confirm the details of your transaction before sending',
    icon: PackageCheck, // You can replace this with a suitable icon
  },
  {
    title: 'Track Your Transaction',
    description: 'Verify your transaction on the blockchain',
    icon: CheckCircle,
  },
];


export default function HowItWorks() {
  return (
    <div id="how-it-works" className="bg-gray-50 py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
            Getting Started
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Get started with EtherFlow in just a few simple steps
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-8 md:gap-y-10">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -left-4 top-8 h-0.5 w-8 bg-indigo-100 hidden lg:block"></div>
                  <span className="absolute -left-8 top-6 w-8 text-center text-sm font-medium text-indigo-600 hidden lg:block">
                    {index + 1}
                  </span>
                  <h3 className="text-lg leading-6 font-medium text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}