-- Run this migration in the Supabase SQL Editor. It keeps project-files private
-- and scopes every object to the authenticated user's assigned project.

create policy "Project members can upload requirement files"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'project-files'
  and exists (
    select 1
    from public.project_members pm
    where pm.project_id::text = (storage.foldername(name))[1]
      and pm.user_id = auth.uid()
  )
);

create policy "Project members can read requirement files"
on storage.objects for select to authenticated
using (
  bucket_id = 'project-files'
  and exists (
    select 1
    from public.project_members pm
    where pm.project_id::text = (storage.foldername(name))[1]
      and pm.user_id = auth.uid()
  )
);

create policy "Project members can delete requirement files"
on storage.objects for delete to authenticated
using (
  bucket_id = 'project-files'
  and exists (
    select 1
    from public.project_members pm
    where pm.project_id::text = (storage.foldername(name))[1]
      and pm.user_id = auth.uid()
  )
);
