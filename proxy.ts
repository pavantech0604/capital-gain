import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Intercept the IDE preview pane's infinite cache-bust loop
  if (url.searchParams.has('cache-bust')) {
    url.searchParams.delete('cache-bust');
    
    // We return a rewrite to strip the cache-bust from the URL
    // A rewrite avoids 307 Redirects, which break old Service Workers
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/',
}
