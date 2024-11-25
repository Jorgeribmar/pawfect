import { User, Post, Pet } from '../types';

// Dog breeds for variety
const DOG_BREEDS = [
  'Labrador Retriever', 'German Shepherd', 'Golden Retriever', 'French Bulldog',
  'Bulldog', 'Poodle', 'Beagle', 'Rottweiler', 'Dachshund', 'Yorkshire Terrier',
  'Boxer', 'Australian Shepherd', 'Siberian Husky', 'Shih Tzu', 'Great Dane'
];

// Training topics for post content variety
const TRAINING_TOPICS = [
  'leash training', 'potty training', 'crate training', 'socialization',
  'basic commands', 'agility training', 'behavioral issues', 'puppy training',
  'advanced obedience', 'trick training', 'therapy dog training', 'service dog training'
];

// Generate random date within the last 30 days
const getRandomRecentDate = () => {
  const now = new Date();
  const thirtyDaysAgo = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
  return new Date(thirtyDaysAgo.getTime() + Math.random() * (now.getTime() - thirtyDaysAgo.getTime())).toISOString();
};

// Generate random number between min and max
const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate mock users
export const MOCK_USERS: User[] = Array.from({ length: 100 }, (_, i) => {
  const gender = Math.random() > 0.5 ? 'women' : 'men';
  const userNumber = getRandomNumber(1, 70);
  
  return {
    id: `user-${i + 1}`,
    name: `${['Sarah', 'Mike', 'Emma', 'James', 'Lisa', 'John', 'Maria', 'David', 'Anna', 'Peter'][i % 10]} ${
      ['Johnson', 'Wilson', 'Brown', 'Davis', 'Miller', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson'][i % 10]
    }`,
    email: `user${i + 1}@example.com`,
    avatar: `https://images.unsplash.com/photo-${getRandomNumber(1000000000000, 9999999999999)}?w=150`,
    bio: [
      'Professional dog trainer with 10+ years experience',
      'Certified animal behaviorist',
      'Dog psychology expert',
      'Passionate about positive reinforcement training',
      'Specializing in rescue dog rehabilitation',
      'Agility training specialist',
      'Therapy dog program coordinator',
      'Puppy training expert',
      'Service dog trainer',
      'Canine good citizen evaluator'
    ][i % 10],
    pets: Array.from({ length: getRandomNumber(1, 3) }, (_, j) => ({
      id: `pet-${i}-${j}`,
      name: ['Max', 'Luna', 'Charlie', 'Bella', 'Rocky', 'Lucy', 'Bailey', 'Cooper'][getRandomNumber(0, 7)],
      breed: DOG_BREEDS[getRandomNumber(0, DOG_BREEDS.length - 1)],
      age: getRandomNumber(1, 12),
      photo: `https://images.unsplash.com/photo-${getRandomNumber(1000000000000, 9999999999999)}?w=300`
    })),
    createdAt: getRandomRecentDate()
  };
});

// Generate mock posts
export const MOCK_POSTS: Post[] = Array.from({ length: 200 }, (_, i) => {
  const user = MOCK_USERS[getRandomNumber(0, MOCK_USERS.length - 1)];
  const topic = TRAINING_TOPICS[getRandomNumber(0, TRAINING_TOPICS.length - 1)];
  const hasImage = Math.random() > 0.3;

  const contents = [
    `Essential tips for ${topic}:\n\n1. Start with basics\n2. Be consistent\n3. Use positive reinforcement\n4. Practice regularly\n5. Stay patient`,
    `Quick guide to ${topic}! Remember: every dog learns at their own pace. The key is consistency and positive reinforcement. #DogTraining #PawfectLearning`,
    `Today's success story: One of my clients made amazing progress with ${topic}. Here's what worked for us...`,
    `Common mistakes to avoid in ${topic}:\n\n❌ Rushing the process\n❌ Inconsistent commands\n❌ Negative reinforcement\n\n✅ Instead, focus on patience and positive feedback!`,
    `Q&A time! The most common questions I get about ${topic}, answered! Share your experiences below 👇`
  ];

  return {
    id: `post-${i + 1}`,
    userId: user.id,
    user,
    content: contents[getRandomNumber(0, contents.length - 1)],
    images: hasImage ? [`https://images.unsplash.com/photo-${getRandomNumber(1000000000000, 9999999999999)}?w=800`] : [],
    likes: getRandomNumber(5, 200),
    comments: Array.from({ length: getRandomNumber(0, 10) }, (_, j) => ({
      id: `comment-${i}-${j}`,
      userId: MOCK_USERS[getRandomNumber(0, MOCK_USERS.length - 1)].id,
      user: MOCK_USERS[getRandomNumber(0, MOCK_USERS.length - 1)],
      content: [
        'Great advice! This worked really well with my pup.',
        'Thanks for sharing these tips!',
        'Could you elaborate more on point #2?',
        'My dog and I are struggling with this. Any additional tips?',
        'This is exactly what we needed!'
      ][getRandomNumber(0, 4)],
      createdAt: getRandomRecentDate()
    })),
    createdAt: getRandomRecentDate()
  };
});