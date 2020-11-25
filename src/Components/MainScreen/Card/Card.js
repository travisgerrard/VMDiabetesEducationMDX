import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import IosArrowForward from 'react-ionicons/lib/IosArrowForward';
import IosCheckmarkCircleOutline from 'react-ionicons/lib/IosCheckmarkCircleOutline';

const Container = styled.div`
  padding-left: 25px;
  padding-right: 25px;
  padding-bottom: 25px;
  padding-top: 15px;
`;

const Headline = styled.p`
  font-size: 24px;
  font-weight: bold;
  font-family: Helvetica Neue, Arial, sans-serif;
  line-height: 1;
  margin: 0;
  cursor: pointer;
`;

const SectionsCompleted = styled.p`
  font-size: 12px;
  font-weight: bold;
  font-family: Helvetica Neue, Arial, sans-serif;
  color: rgb(1, 121, 213);
  line-height: 1;
`;

const Subheadline = styled.p`
  font-size: 16px;
  font-family: Helvetica Neue, Arial, sans-serif;

  /* white-space: normal; */
  line-height: 1;
`;

const TopicListItem = styled.p`
  font-size: 20px;
  font-family: Helvetica Neue, Arial, sans-serif;
  font-weight: lighter;
  line-height: 1;
  margin: 0px;
  cursor: pointer;
`;

const TopicListItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  margin-bottom: 8px;
  justify-content: space-between;
`;

function Card({ item }) {
  const { id, slug, title, subtitle, sections } = item;

  function returnSectionsCompleted() {
    const hasRead = sections.filter((subSection) => {
      return subSection.hasRead;
    }).length;

    return hasRead;
  }

  return (
    <Container key={id}>
      <Link href={`/${slug}`}>
        <Headline>{title}</Headline>
      </Link>
      <SectionsCompleted>
        {returnSectionsCompleted()}/{sections.length} LESSONS COMPLETED
      </SectionsCompleted>
      <Subheadline>{subtitle}</Subheadline>
      <hr />
      {sections.map((section, index) => {
        return (
          <React.Fragment key={section.id}>
            <Link href={`/${slug}/${section.slug}.html`}>
              <TopicListItemContainer>
                <TopicListItem>{section.title}</TopicListItem>
                <div>
                  {section.hasRead && (
                    <IosCheckmarkCircleOutline color="rgb(0, 128, 0)" />
                  )}
                  <IosArrowForward color="gray" />
                </div>
              </TopicListItemContainer>
            </Link>
            <hr />
          </React.Fragment>
        );
      })}
    </Container>
  );
}

export default Card;
