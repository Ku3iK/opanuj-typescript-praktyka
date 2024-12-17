interface GoogleIdentity {
  id: string;
  provider: 'google';
  userName: string;
}

interface AppleIdentity {
  id: string;
  provider: 'apple';
  userName: string;
}

interface RedditIdentity {
  id: string;
  provider: 'reddit';
  userName: string;
}

type Providers = 'apple' | 'google' | 'reddit';

type Identity = GoogleIdentity | AppleIdentity | RedditIdentity;

interface IdentityProvider {
  findById: (id: string) => Identity | undefined;
  findByUserName: (userName: string) => Identity | undefined;
}

const users: ReadonlyArray<GoogleIdentity | AppleIdentity | RedditIdentity> = [
  { id: '1', provider: 'google', userName: 'John Doe' },
  { id: '2', provider: 'apple', userName: 'Kate Williams' },
  { id: '3', provider: 'google', userName: 'Jane Doe' },
  { id: '4', provider: 'reddit', userName: 'Alex Smith' },
  { id: '5', provider: 'google', userName: 'Mike Johnson' },
  { id: '6', provider: 'reddit', userName: 'John Doe' },
];

class GoogleIdentityProcessor implements IdentityProvider {
  findById(id: string): GoogleIdentity | undefined {
    return users.find((user) => user.id === id && user.provider === 'google') as
      | GoogleIdentity
      | undefined;
  }

  findByUserName(userName: string): GoogleIdentity | undefined {
    return users.find((user) => user.userName === userName && user.provider === 'google') as
      | GoogleIdentity
      | undefined;
  }
}

class AppleIdentityProcessor implements IdentityProvider {
  findById(id: string): AppleIdentity | undefined {
    return users.find((user) => user.id === id && user.provider === 'apple') as
      | AppleIdentity
      | undefined;
  }

  findByUserName(userName: string): AppleIdentity | undefined {
    return users.find((user) => user.userName === userName && user.provider === 'apple') as
      | AppleIdentity
      | undefined;
  }
}

class RedditIdentityProcessor implements IdentityProvider {
  findById(id: string): RedditIdentity | undefined {
    return users.find((user) => user.id === id && user.provider === 'reddit') as
      | RedditIdentity
      | undefined;
  }

  findByUserName(userName: string): RedditIdentity | undefined {
    return users.find((user) => user.userName === userName && user.provider === 'reddit') as
      | RedditIdentity
      | undefined;
  }
}

export class IdentityProcessor {
  private selectedProvider: IdentityProvider;

  private readonly PROVIDERS: Record<Providers, IdentityProvider> = {
    apple: new AppleIdentityProcessor(),
    google: new GoogleIdentityProcessor(),
    reddit: new RedditIdentityProcessor(),
  };

  constructor(private readonly provider: Providers) {
    const selectedProviderInstance = this.PROVIDERS[this.provider];
    if (!selectedProviderInstance) {
      throw new Error(`Provider '${provider}' is not supported.`);
    }

    this.selectedProvider = selectedProviderInstance;
  }

  findById(id: string): Identity | undefined {
    return this.selectedProvider?.findById(id);
  }

  findByUserName(userName: string): Identity | undefined {
    return this.selectedProvider?.findByUserName(userName);
  }
}
