// Only add real, approved instructor profiles here. While this list is empty
// the instructor sections show a "profiles coming soon" notice instead.

export type Instructor = {
  slug: string;
  name: string;
  title: string;
  expertise: string;
  bio: string;
  photo: string;
};

export const instructors: Instructor[] = [];
