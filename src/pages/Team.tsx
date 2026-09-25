import { ProfileGrid } from '../components/Cards'
import { PageHeader, Section } from '../components/Section'
import { team } from '../data/site'

export function Team() {
  return (
    <>
      <PageHeader title="Team" intro="The students behind elevate." />
      <Section>
        <ProfileGrid people={team} />
      </Section>
    </>
  )
}
