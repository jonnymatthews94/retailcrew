import { ClipboardList, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUser } from '../../../contexts/user-context';

const steps = [
  {
    title: 'Submit your offer',
    description: 'Fill out a simple form with your discount details. Takes just 2 minutes.',
    icon: ClipboardList
  },
  {
    title: 'Quick verification',
    description: 'We verify your brand and discount details within 24 hours.',
    icon: ShieldCheck
  },
  {
    title: 'Start connecting',
    description: 'Your offer goes live to thousands of verified retail professionals.',
    icon: Users
  }
];

export function Process() {
  const { user } = useUser();

  return (
    <section className="bg-primary-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold">Launch in minutes</h2>
          <p className="mt-4 text-lg text-gray-600">
            Getting your offer live on RetailCrew is quick and simple
          </p>
        </div>

        <div className="mt-16">
          <div className="grid gap-8 lg:grid-cols-3">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="flex flex-col items-center text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100">
                    <Icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="mt-4 font-semibold text-gray-900">
                    Step {index + 1}: {step.title}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link
              to={user ? "/list-your-brand/create" : "/signup?returnTo=/list-your-brand/create"}
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-base font-semibold text-white hover:bg-primary-700"
            >
              Launch on RetailCrew
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}