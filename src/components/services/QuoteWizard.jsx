import { Calculator } from 'lucide-react';
import QuoteStepServices from './QuoteStepServices';
import QuoteStepOptions from './QuoteStepOptions';
import QuoteStepContact from './QuoteStepContact';
import { useQuoteWizard } from '../../hooks/useQuoteWizard';

/**
 * QuoteWizard — Orquestador del Cotizador Interactivo de Proyectos Web en 3 Pasos
 * Arquitectura desacoplada:
 * - Estado y validaciones: src/hooks/useQuoteWizard.js + src/utils/quoteValidation.js
 * - Paso 1 (Alcance): QuoteStepServices.jsx
 * - Paso 2 (Requisitos): QuoteStepOptions.jsx
 * - Paso 3 (Dossier & Contacto): QuoteStepContact.jsx
 */
export default function QuoteWizard({
  services = [],
  isEs = true,
  preselectedServiceId = null
}) {
  const {
    wizardStep,
    setWizardStep,
    selectedService,
    handleSelectService,
    currentServiceObj,
    serviceConfig,
    selectedTier,
    setSelectedTier,
    selectedCustomOption,
    setSelectedCustomOption,
    selectedCustomOptionObj,
    selectedAddons,
    toggleAddon,
    projectDescription,
    setProjectDescription,
    clientName,
    clientEmail,
    clientPhone,
    errors,
    touched,
    isSubmittingEmail,
    handleStep3FieldChange,
    handleStep3Blur,
    handleSendQuoteEmail,
    handleSendQuoteWhatsApp
  } = useQuoteWizard({ services, isEs, preselectedServiceId });

  const steps = [
    { number: 1, label: isEs ? 'Alcance' : 'Scope' },
    { number: 2, label: isEs ? 'Requisitos' : 'Requirements' },
    { number: 3, label: isEs ? 'Contacto' : 'Contact' }
  ];

  return (
    <section id="cotizador-wizard" className="pt-16 pb-8 border-t border-slate-200 dark:border-white/[0.08]">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calculator size={16} className="text-blue-600 dark:text-[#3b82f6]" />
            <span className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-[#3b82f6] uppercase">
              {isEs ? 'Solicitud de Proyecto' : 'Project Proposal'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white mb-3 tracking-tight">
            {isEs ? (
              <>Cotizador de <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Proyectos Web</span></>
            ) : (
              <>Interactive Project <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 dark:from-blue-400 dark:via-blue-500 dark:to-sky-300 bg-clip-text text-transparent">Quoter</span></>
            )}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {isEs
              ? 'Configura el alcance y requerimientos técnicos de tu software para despachar el brief automáticamente por correo o WhatsApp.'
              : 'Configure the scope and technical requirements of your software to dispatch the brief automatically via email or WhatsApp.'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.09] rounded-2xl p-5 sm:p-8 md:p-10 backdrop-blur-md shadow-xl dark:shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
          {/* Step Indicators — Centrado perfecto y 100% responsive sin saltos de línea */}
          <div className="w-full max-w-sm sm:max-w-md mx-auto flex items-center justify-between gap-1 sm:gap-2 mb-8 sm:mb-10 select-none">
            {steps.map((step, idx) => {
              const isActiveOrCompleted = wizardStep >= step.number;
              const isConnectorActive = wizardStep >= step.number + 1;

              return (
                <div key={step.number} className=" contents">
                  <button
                    type="button"
                    onClick={() => setWizardStep(step.number)}
                    className={`inline-flex items-center gap-1.5 sm:gap-2 bg-transparent border-none p-0 cursor-pointer transition-colors ${isActiveOrCompleted ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'
                      }`}
                    data-cursor="pointer"
                  >
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-200 shrink-0 ${isActiveOrCompleted
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                          : 'bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/10 text-slate-600 dark:text-white'
                        }`}
                    >
                      {step.number}
                    </span>
                    <span className="text-[11px] sm:text-xs md:text-sm font-semibold whitespace-nowrap">
                      {step.label}
                    </span>
                  </button>

                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-1.5 sm:mx-2.5 transition-colors duration-300 ${isConnectorActive ? 'bg-blue-600 dark:bg-[#3b82f6]' : 'bg-slate-200 dark:bg-white/10'
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Wizard Steps Content */}
          <div>
            {wizardStep === 1 && (
              <QuoteStepServices
                services={services}
                selectedService={selectedService}
                setSelectedService={handleSelectService}
                isEs={isEs}
                onNext={() => setWizardStep(2)}
              />
            )}

            {wizardStep === 2 && (
              <QuoteStepOptions
                serviceName={currentServiceObj?.shortTitle || selectedService}
                serviceConfig={serviceConfig}
                selectedTier={selectedTier}
                setSelectedTier={setSelectedTier}
                selectedCustomOption={selectedCustomOption}
                setSelectedCustomOption={setSelectedCustomOption}
                selectedAddons={selectedAddons}
                toggleAddon={toggleAddon}
                isEs={isEs}
                onBack={() => setWizardStep(1)}
                onNext={() => setWizardStep(3)}
              />
            )}

            {wizardStep === 3 && (
              <QuoteStepContact
                serviceName={currentServiceObj?.shortTitle || selectedService}
                serviceConfig={serviceConfig}
                selectedTier={selectedTier}
                selectedCustomOptionObj={selectedCustomOptionObj}
                selectedAddons={selectedAddons}
                clientName={clientName}
                clientEmail={clientEmail}
                clientPhone={clientPhone}
                projectDescription={projectDescription}
                setProjectDescription={setProjectDescription}
                errors={errors}
                touched={touched}
                isSubmittingEmail={isSubmittingEmail}
                onFieldChange={handleStep3FieldChange}
                onFieldBlur={handleStep3Blur}
                onSubmitEmail={handleSendQuoteEmail}
                onSendWhatsApp={handleSendQuoteWhatsApp}
                onEditOptions={() => setWizardStep(2)}
                isEs={isEs}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
