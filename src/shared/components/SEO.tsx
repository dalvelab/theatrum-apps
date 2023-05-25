import Head from 'next/head';
import {useRouter} from 'next/router';
import { ReactNode } from "react"

import { CANONICAL_DOMAIN } from '../contants';

interface SEOProps {
  children: ReactNode;
}

export const SEO: React.FC<SEOProps> = ({children}) => {
  const {asPath} = useRouter();

  return (
    <Head>
      {children}
      <meta property="og:url" content={CANONICAL_DOMAIN + asPath} />
      <link rel="canonical" href={CANONICAL_DOMAIN + asPath} />
    </Head>
  )
}