"use client";
import { useState } from "react";

// Helper icon for completed steps
const CheckIcon = () => (
  <svg
    className="w-4 h-4 text-white"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

// Data arrays for sections and contacts
const sections = ["Cover Letter", "Introduction", "Objective"];
const contacts = ["John Doe", "Jane Smith", "Michael Johnson", "Emily Davis"];

type ProposalSectionFormProps = {
  handleCancel: () => void;
};

export default function ProposalSectionForm({ handleCancel }: ProposalSectionFormProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [selectedContact, setSelectedContact] = useState<string>("");
  const [step, setStep] = useState(1);

  // For the final "Share Proposal" step
  const [emailSubject, setEmailSubject] = useState("Account Proposal");
  const [commonMessage, setCommonMessage] = useState("Enter Common Message");

  // Define the steps for the stepper
  const steps = ["Select Section", "Proposal Preview", "Select Contact", "Add Fields"];

  // Toggle section selection (Step 1)
  const toggleSection = (section: string) => {
    setSelectedSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  // Optional: handle the final send
  const handleSendProposal = () => {
    // You can integrate your send logic here (e.g. API call)
    console.log("Proposal sent!");
    // Close the form or move to a success page, etc.
    handleCancel();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-md">
        
        {/* Dynamic heading: Steps 1-3 = "Create Proposal", Step 4 = "Share Proposal" */}
        <h2 className="text-2xl font-semibold mb-4">
          {step < 4 ? "Create Proposal" : "Share Proposal"}
        </h2>

        {/* Stepper Navigation */}
        <div className="flex items-center mb-6">
          {steps.map((stage, index) => {
            const currentStep = index + 1;
            const isCompleted = step > currentStep; // steps before the current one
            const isActive = step === currentStep;   // the current step

            return (
              <div key={stage} className="flex items-center flex-1">
                {/* Circle with check icon or step number */}
                <div className="relative flex flex-col items-center">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center 
                      ${
                        isCompleted
                          ? "bg-green-500"  // completed
                          : isActive
                          ? "bg-blue-500"   // current
                          : "bg-gray-300"   // upcoming
                      }
                    `}
                  >
                    {isCompleted ? (
                      <CheckIcon />
                    ) : (
                      <span className="text-white font-bold text-sm">{currentStep}</span>
                    )}
                  </div>
                  <span className="mt-2 text-xs text-center w-16">{stage}</span>
                </div>

                {/* Connecting line (except after the last step) */}
                {index < steps.length - 1 && (
                  <div className="flex-auto border-t-2 border-gray-300 mx-2"></div>
                )}
              </div>
            );
          })}
        </div>

        {/* STEP 1: Select Sections */}
        {step === 1 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Select Sections</h3>
            {sections.map((section) => (
              <div key={section} className="flex items-center space-x-3 mb-2">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={selectedSections.includes(section)}
                  onChange={() => toggleSection(section)}
                />
                <span className="text-gray-700">{section}</span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 2: Proposal Preview */}
        {step === 2 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Proposal Preview</h3>
            <div className="border rounded-lg p-4 h-48 overflow-y-auto bg-gray-50 shadow-inner">
              <h4 className="text-lg font-semibold text-center italic">Bookkeeping Proposal</h4>
              <p className="text-center font-bold mt-1">For</p>
              <p className="text-center font-bold text-gray-700">
                {selectedContact || "[Client Company Name]"}
              </p>
              <p className="mt-4 text-gray-700 text-sm">
                I am writing to propose our bookkeeping services to{" "}
                {selectedContact || "[Client Business Name]"}. We are a team of experienced and
                dedicated professionals committed to providing accurate, efficient, and reliable
                bookkeeping services tailored to your business needs.
              </p>
            </div>
          </div>
        )}

        {/* STEP 3: Select Contact */}
        {step === 3 && (
          <div>
            <h3 className="text-lg font-medium mb-2">Select Contact</h3>
            <label className="block text-gray-700 font-medium mb-2">Choose a contact:</label>
            <select
              value={selectedContact}
              onChange={(e) => setSelectedContact(e.target.value)}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Contact --</option>
              {contacts.map((contact, index) => (
                <option key={index} value={contact}>
                  {contact}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* STEP 4: "Share Proposal" UI (instead of "Add Fields") */}
        {step === 4 && (
          <div>
            {/* The big heading is already handled above with a conditional. */}

            {/* Two-column layout: Left for inputs, Right for email preview */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Left Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Subject
                </label>
                <input
                  type="text"
                  className="w-full border p-2 rounded-md"
                  value={emailSubject}
                  onChange={(e) => setEmailSubject(e.target.value)}
                />

                <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
                  Common Message
                </label>
                <textarea
                  className="w-full border p-2 rounded-md h-32"
                  value={commonMessage}
                  onChange={(e) => setCommonMessage(e.target.value)}
                />
              </div>

              {/* Right Column */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Preview
                </label>
                <div className="border p-4 rounded-md bg-gray-50">
                  <p className="font-bold text-center">LOGO</p>
                  <p className="mt-2">Hi Ricky,</p>
                  <p>Private message line display here and let me know if you have any questions.</p>
                  <p className="mt-2">Take a look at our proposal</p>
                  <p className="text-blue-500 underline cursor-pointer">View Proposal</p>
                  <p className="mt-4">Kind Regards,</p>
                  <p>Accountax</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        {step < 4 ? (
          /* Steps 1, 2, 3: Show the usual 4-button row */
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={step === 1}
              onClick={() => setStep((prev) => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              disabled={
                (step === 1 && selectedSections.length === 0) ||
                (step === 3 && !selectedContact)
              }
              onClick={() => setStep((prev) => Math.min(4, prev + 1))}
            >
              Next
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
              Save as Template
            </button>
          </div>
        ) : (
          /* Step 4: Show the final 3-button row from your screenshot */
          <div className="flex justify-between mt-6">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={() => setStep(3)}
            >
              Previous
            </button>
            <button
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
              onClick={handleCancel}
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSendProposal}
            >
              Send Proposal
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
