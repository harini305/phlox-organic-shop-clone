import Image from "next/image";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { aboutStory, team, whoWeAre } from "@/data/site";
import styles from "./page.module.css";

export const metadata = {
  title: "About",
  description: "How a single market stall became an organic grocery delivered plastic-free — and the team behind it.",
};

export default function AboutPage() {
  const [storyBack, storyFront] = aboutStory.images;

  return (
    <>
      <section className={styles.story}>
        <div className={`container ${styles.storyGrid}`}>
          <div className={styles.collage} data-reveal>
            <div className={styles.photoBack}>
              <Image
                src={storyBack.src}
                alt={storyBack.alt}
                fill
                priority
                sizes="(max-width: 767px) 70vw, 425px"
                className={styles.cover}
              />
            </div>
            <span className={styles.accent} aria-hidden="true" />
            <div className={styles.photoFront}>
              <Image
                src={storyFront.src}
                alt={storyFront.alt}
                fill
                sizes="(max-width: 767px) 70vw, 425px"
                className={styles.coverRight}
              />
            </div>
          </div>

          <div className={styles.storyText} data-reveal>
            <p className={styles.eyebrow}>{aboutStory.eyebrow}</p>
            <h1 className={styles.title}>{aboutStory.title}</h1>
            <p className={styles.lead}>{aboutStory.text}</p>
            <ul className={styles.points}>
              {aboutStory.points.map((p) => (
                <li key={p.title}>
                  <h2 className={styles.pointTitle}>{p.title}</h2>
                  <p>{p.text}</p>
                </li>
              ))}
            </ul>
            <Button href="#who-we-are" variant="accent" size="lg">
              Read more
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.team} aria-labelledby="team-heading">
        <div className="container">
          <SectionHeading
            eyebrow="Our Team"
            title="Meet Our Team"
            id="team-heading"
            className={styles.heading}
            data-reveal
          />
          <ul className={styles.teamGrid}>
            {team.map((member) => (
              <li key={member.name} className={styles.member} data-reveal>
                <div className={styles.portrait}>
                  <Image
                    src={member.image}
                    alt={`Portrait of ${member.name}`}
                    fill
                    sizes="(max-width: 767px) 90vw, (max-width: 1024px) 45vw, 300px"
                    className={styles.cover}
                  />
                </div>
                <div className={styles.plate}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={styles.who} id="who-we-are" aria-labelledby="who-heading">
        <div className="container">
          <SectionHeading
            eyebrow={whoWeAre.eyebrow}
            title={whoWeAre.title}
            id="who-heading"
            className={styles.heading}
            data-reveal
          />
          <p className={styles.whoText} data-reveal>
            {whoWeAre.text}
          </p>
          <div className={styles.whoGrid}>
            {whoWeAre.images.map((img) => (
              <div key={img.src} className={styles.whoPhoto} data-reveal>
                <Image src={img.src} alt={img.alt} fill sizes="(max-width: 767px) 100vw, 640px" className={styles.cover} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
