import { ContactFormConfig, SocialLink } from "@/data/types";

export const socialLinks: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/replace-with-your-profile/",
    note: "Editable placeholder — replace with your public LinkedIn URL.",
  },
  {
    label: "GitHub",
    href: "https://github.com/YatishGurrala",
  },
  {
    label: "X",
    href: "https://x.com/replace-with-your-handle",
    note: "Editable placeholder — replace with your X profile.",
  },
  {
    label: "Email",
    href: "mailto:hello@example.com",
    note: "Editable placeholder — replace with your preferred inquiry email.",
  },
  {
    label: "Techbckp",
    href: "https://techbckp.example.com",
    note: "Editable placeholder — replace with the live Techbckp website URL.",
  },
];

export const contactFormConfig: ContactFormConfig = {
  formspreeEndpoint: "https://formspree.io/f/replace-with-your-form-id",
  emailLink: "mailto:hello@example.com?subject=Project%20Inquiry",
  calendlyLink: "https://calendly.com/replace-with-your-link",
  googleFormLink: "https://forms.gle/replace-with-your-form-link",
  placeholderNote:
    "Editable placeholders — update the contact links before publishing so inquiries route to your preferred destination.",
};
