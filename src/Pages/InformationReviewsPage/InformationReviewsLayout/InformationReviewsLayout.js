import React from "react";
import Text from "../../../helpers/Text";
import Breadcrumbs from "../../../Views/Breadcrumbs";
import Block from '../../../Views/GridContainerBlock';
import Title from "../../../Views/Title";
import InformationViews from "../../../Views/InformationViews";
import Button from "../../../Views/Button";
import FiltersReviewsHome from '../../../Views/FiltersReviewsHome';
import Select from '../../../Views/Select';
import CheckBox from '../../../Views/CheckBox';
import Pagination from '../../../Views/Pagination';
import ReviewsCard from '../../../Views/ReviewsCard';
import BlockSpinner from '../../../Views/SpinnerWrapper';

const InformationReviewsLayout = ({
  title,
  breadcrumbs,
  setFiltersDec,
  filters,
  openModalAddReview,
  insta_link,
  optionsSort,
  filterParams,
  showMore,
  loadData,
  resultsReversed,
  changeIswithMedia,
  countReviewsIsMedia,
  handlerSelectFilter,
  handlerGotoInsta,
}) => {

  return (
    <Block.Container>
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <InformationViews.PaymentsConteiner>
        <Title variant={'information-payments__title'} type={'h1'}>
          {
            !title ?
              Text({ text: 'reviews' })
              : title
          }
        </Title>
        <InformationViews.HowToWrapper>
          <InformationViews.SubTitle variant={'subtitle-reviews'}>
            {
              Text({ text: 'more-reviews' })
            }
          </InformationViews.SubTitle>

          <InformationViews.WrapperButtonReviews>
            <Button
              onClick={openModalAddReview}
              variant={'catalog-link-uppercase'}
              data-cy={`buttonOpenModalAddReview`}
            >
              {
                Text({ text: 'add.review' })
              }
            </Button>
            <Button
              onClick={()=>handlerGotoInsta(insta_link)}
              variant={'catalog-link-transparent'}
              data-cy={`buttonLinkTransprentInstagram`}
            >
              {
                Text({ text: 'veiw-insta' })
              }
            </Button>
          </InformationViews.WrapperButtonReviews>

          <FiltersReviewsHome
            setFilters={(data) => setFiltersDec(data, filterParams, loadData)}
            filters={filters}
          />
          <InformationViews.WrapperSortReviews>
            <Select
              variant={'select-theme__black-full'}
              data-cy={`select-reviews-dropdown`}
              placeholder={'Выберите вариант'}
              options={optionsSort}
              onClick={handlerSelectFilter}
            />
            <CheckBox
              checked={filterParams.is_with_media}
              onChange={changeIswithMedia}
              variant="input"
              label={`С фотографиями (${countReviewsIsMedia})`}
              data-cy={`checkBoxInPageRewiews`}
            />
          </InformationViews.WrapperSortReviews>
          {
            !!resultsReversed.length ?
              resultsReversed.map((el) => {
                return <ReviewsCard
                  blockEnableView
                  {...el}
                  key={el.id} />;
              })
              : <BlockSpinner.SpinnerWrapper>
                <BlockSpinner.SpinnerCenter>
                  <BlockSpinner.Spinner size={40} />
                </BlockSpinner.SpinnerCenter>
              </BlockSpinner.SpinnerWrapper>
          }
          <InformationViews.PaginationsWrapper>
            {/* <Pagination /> */}
          </InformationViews.PaginationsWrapper>
          {/* <InformationViews.PaginationsWrapper center>
            {isNext ? <InformationViews.ShowMoreBtn allCount={count} currentCount={results.length} onClick={showMore} /> : null}
          </InformationViews.PaginationsWrapper> */}

        </InformationViews.HowToWrapper>
      </InformationViews.PaymentsConteiner>
    </Block.Container>
  )
}

export default InformationReviewsLayout;