import Layout from "../components/Layout";
import Section from "../components/Section";
import ProjectCard from "../components/ProjectCard";
import Hero from "../components/Hero";

export default function Home() {
  return (
    <Layout>
      <Hero />

      <Section id="about">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2 glass p-8 rounded-2xl">
            <h2 className="text-2xl font-bold">About</h2>
            <p className="mt-4 text-slate-300">
              I am a robotics engineer specializing in Reinforcement Learning
              (RL), SLAM and Control. My work spans simulation-to-real
              pipelines, state estimation, and deploying robust controllers to
              robots operating in dynamic environments.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-300">
              <li>
                • Research & Development of model-based and model-free RL for
                robot locomotion and manipulation.
              </li>
              <li>
                • Probabilistic SLAM — mapping, loop closure and sensor fusion.
              </li>
              <li>
                • Control systems — MPC, robust controllers and safety filters.
              </li>
            </ul>
          </div>

          <div className="glass p-6 rounded-2xl">
            <h3 className="font-semibold">Contact</h3>
            <p className="mt-2 text-slate-300 text-sm">
              Email:{" "}
              <a href="mailto:you@domain.com" className="underline">
                you@domain.com
              </a>
            </p>
            <p className="mt-2 text-slate-300 text-sm">
              Location: Baku, Azerbaijan
            </p>
          </div>
        </div>
      </Section>

      <Section id="projects">
        <h2 className="text-3xl font-bold">Selected Projects</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProjectCard
            title="Sim2Real RL Locomotion"
            desc="Train robust locomotion policies in simulation and transfer to quadruped using domain randomization and system ID."
            tags={["RL", "Sim2Real", "Robotics"]}
          />
          <ProjectCard
            title="Multi-Sensor SLAM"
            desc="Tightly-coupled lidar+visual-inertial SLAM with loop closure and map merging across sessions."
            tags={["SLAM", "Mapping", "C++"]}
          />
          <ProjectCard
            title="Safe MPC Controller"
            desc="Model predictive controller with safety filters and fallback strategies for obstacle-rich environments."
            tags={["Control", "MPC", "Safety"]}
          />
        </div>
      </Section>

      <Section id="skills">
        <h2 className="text-3xl font-bold">Skills & Tools</h2>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            "C++",
            "Python",
            "ROS2",
            "PyTorch",
            "Gym/Sim",
            "Gazebo",
            "SLAM",
            "MPC",
            "Kalman Filters",
            "Optim",
          ].map((s) => (
            <span key={s} className="px-3 py-1 bg-white/5 rounded-full text-sm">
              {s}
            </span>
          ))}
        </div>
      </Section>

      <Section id="contact">
        <div className="glass p-8 rounded-2xl">
          <h2 className="text-2xl font-bold">Let's build robots that learn</h2>
          <p className="mt-4 text-slate-300">
            If you have an idea — research collaboration, job opportunity or a
            robot that needs to learn — reach out:{" "}
            <a href="mailto:you@domain.com" className="underline">
              you@domain.com
            </a>
          </p>
        </div>
      </Section>
    </Layout>
  );
}
