-- Website enquiries from the Contact, Apply and course pages.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.

create table if not exists public.enquiries (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  full_name   text not null,
  email       text not null,
  phone       text,
  interest    text,
  study_area  text,
  message     text not null,
  language    text not null default 'en',
  status      text not null default 'new' check (status in ('new', 'contacted', 'enrolled', 'closed'))
);

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);

-- Row-level security on with no policies: the public (anon) key can neither read nor
-- write. The website inserts with the service-role key on the server, which bypasses RLS.
alter table public.enquiries enable row level security;
