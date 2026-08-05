import styles from "./styles.module.css";
import { DynamicIcon } from "lucide-react/dynamic";

/**
 * WorkflowFlow — shows the 8-step practical legal workflow
 */
const WorkflowFlow = ({ workflowdata }) => {
  const steps = workflowdata?.steps ?? [];

  return (
    <section className={styles.workflowsec} id="workflow" aria-labelledby="workflow-heading">
      <div className="container">
        <div className={styles.wflabel} aria-hidden="true">
          {workflowdata?.label ?? "THE PRACTICAL METHOD"}
        </div>
        <h2 className={styles.wfheading} id="workflow-heading">
          {workflowdata?.heading ??
            "Real legal practice — structured, demonstrated and now AI-assisted."}
        </h2>

        {/* Workflow steps — horizontal on desktop, vertical on mobile */}
        <div className={styles.stepsrow} role="list" aria-label="Legal practice workflow steps">
          {steps.map((step, idx) => (
            <div className={styles.stepwrapper} key={step.id} role="listitem">
              <div className={styles.stepcard}>
                <div className={styles.stepnum} aria-hidden="true">
                  {String(idx + 1).padStart(2, "0")}
                </div>
                <div className={styles.steplabel}>{step.label}</div>
              </div>
              {idx < steps.length - 1 && (
                <div className={styles.steparrow} aria-hidden="true">
                  <DynamicIcon name="chevron-right" size={20} color="#b20a0a" />
                </div>
              )}
            </div>
          ))}
        </div>

        <p className={styles.workflownote}>
          AI can assist at any step. Professional judgment and verification remain the advocate&rsquo;s responsibility.
        </p>
      </div>
    </section>
  );
};

export default WorkflowFlow;
