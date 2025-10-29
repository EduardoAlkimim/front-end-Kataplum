import { useState, useEffect } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  caption: string;
  link: string;
}

// Mock data as fallback
const mockPosts: InstagramPost[] = [
  {
    id: '1',
    image: '',
    caption: 'Magical birthday celebration 🎉',
    link: '#',
  },
  {
    id: '2',
    image: '',
    caption: 'Disney theme perfection ✨',
    link: '#',
  },
  {
    id: '3',
    image: '',
    caption: 'Superhero party vibes 💥',
    link: '#',
  },
  {
    id: '4',
    image: '',
    caption: 'Retro 80s party setup 🎸',
    link: '#',
  },
  {
    id: '5',
    image: '',
    caption: 'Beautiful party table 🎂',
    link: '#',
  },
  {
    id: '6',
    image: '',
    caption: 'Fun party games for kids 🎮',
    link: '#',
  },
];

export function InstagramFeed() {
  const [posts, setPosts] = useState<InstagramPost[]>(mockPosts);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);

  // Get API endpoint from environment variable
  const apiEndpoint = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_IG_ENDPOINT) || '';

  useEffect(() => {
    fetchInstagramPosts();

    // Set up online/offline listeners
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const fetchInstagramPosts = async () => {
    // If no API endpoint is configured, use mock data
    if (!apiEndpoint) {
      setPosts(mockPosts);
      setLastFetch(new Date());
      return;
    }

    // Check cache first (30 minutes)
    const cached = localStorage.getItem('instagram_posts');
    const cacheTime = localStorage.getItem('instagram_posts_time');
    
    if (cached && cacheTime) {
      const timeDiff = Date.now() - parseInt(cacheTime);
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (timeDiff < thirtyMinutes) {
        setPosts(JSON.parse(cached));
        setLastFetch(new Date(parseInt(cacheTime)));
        return;
      }
    }

    // Fetch from API
    setIsLoading(true);
    try {
      const response = await fetch(apiEndpoint);
      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      
      // Transform API response to our format
      // Adjust this based on your actual API response structure
      const transformedPosts: InstagramPost[] = data.map((post: any) => ({
        id: post.id,
        image: post.media_url || post.image,
        caption: post.caption || '',
        link: post.permalink || '#',
      }));

      setPosts(transformedPosts);
      setLastFetch(new Date());
      
      // Cache the results
      localStorage.setItem('instagram_posts', JSON.stringify(transformedPosts));
      localStorage.setItem('instagram_posts_time', Date.now().toString());
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      // Fall back to cached data or mock data
      if (cached) {
        setPosts(JSON.parse(cached));
      } else {
        setPosts(mockPosts);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshFeed = () => {
    // Clear cache and fetch fresh data
    localStorage.removeItem('instagram_posts');
    localStorage.removeItem('instagram_posts_time');
    fetchInstagramPosts();
  };

  return (
    <section className="py-16 md:py-24 bg-background" id="instagram">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="mb-4 text-3xl md:text-4xl" style={{ fontWeight: 'var(--font-weight-medium)' }}>
              Acompanhe Histórias
            </h2>
            <p className="text-muted-foreground">
              Veja nossos eventos concluidos
            </p>
          </div>
          <div className="flex items-center gap-4 mt-6 md:mt-0">
            <button
              onClick={refreshFeed}
              disabled={isLoading}
              className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Loading...' : 'Refresh'}
            </button>
            <a
              href="https://instagram.com/kataplum_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-br from-purple-600 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
              <span>Siga-nos</span>
            </a>
          </div>
        </div>

        {isOffline && (
          <div className="mb-6 p-4 bg-[--brand-orange]/10 border border-[--brand-orange] rounded-lg">
            <p className="text-sm">
              You're currently offline. Showing cached content.
            </p>
          </div>
        )}

        {lastFetch && (
          <p className="text-sm text-muted-foreground mb-6">
            Última vez atualizado: {lastFetch.toLocaleString()}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer"
            >
              {/*<ImageWithFallback
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />*/}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="line-clamp-2 mb-2">{post.caption}</p>
                  <div className="flex items-center gap-2 text-sm">
                    <ExternalLink className="w-4 h-4" />
                    <span>Acompanhe no Instagram</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
