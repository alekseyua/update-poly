import React from "react";
import { Formik } from "formik";
import Block from '../../../Views/GridContainerBlock';
import Breadcrumbs from '../../../Views/Breadcrumbs';
import CatalogViews from '../../../Views/CatalogViews';
import Title from "../../../Views/Title";
import Button from "../../../Views/Button";
import Text from "../../../helpers/Text";
import { closeJustIcon } from '../../../images';
import Form from '../../../Views/Form';
import CheckBoxFiltersContainer from './CatalogFilters/CheckBoxFiltersContainer';
import AsyncComponent from '../../../helpers/asyncComponent';
import WarningBlock from '../../../Views/WarningBlock';
import BlockSpinner from '../../../Views/SpinnerWrapper';
import EnabledFiltersOptions from './CatalogFilters/EnabledFiltersOptions';
import EnabledFilters from './CatalogFilters/EnabledFilters';
import Pagination from '../../../Views/Pagination';

const AsynColorsFilters = AsyncComponent(() => {
  return import('./CatalogFilters/ColorsFilters');
});
const AsynSizesFilters = AsyncComponent(() => {
  return import('./CatalogFilters/SizesFilters');
});

const AsyncBrandsFilters = AsyncComponent(() => {
  return import('./CatalogFilters/BrandsFilters');
});

const AsyncTypeProductFilters = AsyncComponent(() => {
  return import('./CatalogFilters/TypeProductFilters');
});

const AsyncProductCard = AsyncComponent(() => {
  return import('../../../Views/ProductCard');
});


const CatalogPageLayout = ({
  breadcrumbs,
  setShowFilters,
  showFilters,
  isShowBtnSubmit,
  offsetTopBtnSubmit,

  content,
  dataProducts,
  valueProducts,
  valueCheckBoxFilters,
  filterParams,
  options,
  currency,
  role,

  isFilters,
  loadData,
  getTitleForDocument,
  openBtnSubmit,
  resetAllFilters,
  resetContextFilter,
  checkIsShowCategorysAndProducType,
  handlerChangePaginations ,
  showMore,
  
}) => {


  return (
    <React.Fragment>
      <Block.Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <React.Fragment>
          <CatalogViews.Row>
            <CatalogViews.Catalog>
              <Title variant={'catalog-heading'} type={'h1'}>
                {
                  getTitleForDocument(valueProducts)
                }
              </Title>
            </CatalogViews.Catalog>
          </CatalogViews.Row>
          <CatalogViews.Row>
            <React.Fragment>
              <CatalogViews.Filters>
                <Button
                  full
                  onClick={() => {
                    setShowFilters(!showFilters)
                  }
                  }
                  onClickIcon={() => {
                    setShowFilters(false)
                  }
                  }
                  classNameIcon={'catalog_mobile__icon'}
                  variant={
                    !showFilters ? 'catalog_mobile__filter' : 'catalog_mobile__filter-closed'
                  }
                  iconRight={showFilters && closeJustIcon}
                >
                  <Text text={'filters'} />
                </Button>

                <CatalogViews.Wrapper
                  isShowMobileFilters={showFilters}
                  catfilter={true}
                >
                  <Formik
                    enableReinitialize
                    initialValues={filterParams}
                    onSubmit={(data) => { loadData(data) }}
                  >
                    {({ handleSubmit, values, setValues }) => {

                      return (
                        <Form novalidate onClick={handleSubmit}>
                          <CatalogViews.SubmitButton
                            isShowBtnSubmit={isShowBtnSubmit}
                            offsetTop={offsetTopBtnSubmit}
                            onClick={() => handleSubmit(values)}
                          />

                          <CheckBoxFiltersContainer
                            valueCheckBoxFilters={valueCheckBoxFilters}
                            loadData={loadData}
                            role={role}
                          />

                          {

                            checkIsShowCategorysAndProducType() ? (
                              <AsyncTypeProductFilters
                                categories={valueProducts.categories}
                                values={values}
                                handleSubmit={handleSubmit}
                                setValues={setValues}
                                openBtnSubmit={openBtnSubmit}
                              />
                            ) : null

                          }

                          {/* {role !== ROLE.RETAIL && role !== ROLE.UNREGISTRED ?*/}

                          <AsyncBrandsFilters
                            brands={valueProducts.brands}
                            values={values}
                            openBtnSubmit={openBtnSubmit}
                            setValues={setValues}
                            role={role}
                          />

                          {/* : null} */}

                          <AsynColorsFilters
                            colors={valueProducts.colors}
                            values={values}
                            setValues={setValues}
                            openBtnSubmit={openBtnSubmit}
                          />

                          <AsynSizesFilters
                            sizes={valueProducts.sizes}
                            values={values}
                            setValues={setValues}
                            openBtnSubmit={openBtnSubmit}
                          />

                          <CatalogViews.Wrapper mobBtns={true}>
                            <Button
                              onClick={resetAllFilters}
                              variant={'catalog_mobile__clear'}
                            >
                              <Text text={'reset.all'} />
                            </Button>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                                setShowFilters(!showFilters);
                              }}
                              variant={'catalog_mobile__apply'}
                            >
                              <Text text={'apply'} />
                            </Button>
                          </CatalogViews.Wrapper>
                        </Form>
                      );
                    }}
                  </Formik>
                </CatalogViews.Wrapper>
              </CatalogViews.Filters>

              {
                !showFilters ?


                  <CatalogViews.Catalog>
                    <WarningBlock
                      variant={'catalog-wrapper'}
                      textWarning = { content? <div dangerouslySetInnerHTML = {{ __html: content }}></div> : '' }
                    />
                    <CatalogViews.SortSelect
                      valueOptionsSort={filterParams.ordering}
                      selectedSortFilters={(selected) => {
                        return loadData({ ordering: selected });
                      }}
                      options={options}
                    />
                    {/* {status === 'loading' ? ( */}
                    { 
                     !!dataProducts?.result?.length ? (
                       <BlockSpinner.SpinnerWrapper>
                         <BlockSpinner.Spinner size="30" />
                       </BlockSpinner.SpinnerWrapper>
                     ) : (
                    <>
                      <CatalogViews.Tags>

                        <EnabledFiltersOptions
                          enabledFilterData={filterParams}
                          defaultFilterData={options}
                          translateKey={'options'}
                          resetContextFilter={resetContextFilter}
                          keyFilter={'ordering'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          resetContextFilter={resetContextFilter}
                          translateItem={'inStock'}
                          translateKey={'catalog'}
                          keyFilter={'is_in_stock'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          resetContextFilter={resetContextFilter}
                          translateItem={'new'}
                          translateKey={'catalog'}
                          keyFilter={'is_new'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          resetContextFilter={resetContextFilter}
                          translateItem={'hit'}
                          translateKey={'catalog'}
                          keyFilter={'is_bestseller'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          resetContextFilter={resetContextFilter}
                          translateItem={'sell.out'}
                          translateKey={'catalog'}
                          keyFilter={'is_closeout'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          translateKey={'category'}
                          resetContextFilter={resetContextFilter}
                          keyFilter={'categories'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          translateKey={'brand'}
                          resetContextFilter={resetContextFilter}
                          keyFilter={'brands'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          translateKey={'color'}
                          resetContextFilter={resetContextFilter}
                          keyFilter={'colors'}
                        />
                        <EnabledFilters
                          enabledFilterData={filterParams}
                          defaultFilterData={valueProducts}
                          translateKey={'size'}
                          resetContextFilter={resetContextFilter}
                          keyFilter={'sizes'}
                        />
                        {isFilters(filterParams, resetAllFilters)}
                      </CatalogViews.Tags>

                      {
                        !!!dataProducts?.results.length && showFilters ? <CatalogViews.EmptyCatalog /> : null
                      }

                      <CatalogViews.WrapperCard>
                            {
                              !!dataProducts?.results.length?
                              dataProducts.results.map((el) => {
                              return (
                                <AsyncProductCard
                                  role = { role }
                                  key = { `${el.title}-${el.id}` }
                                  title = { el.title }
                                  id = { el.id }
                                  url = { el.url }
                                  brand = { el.brand }
                                  prices = { el.prices }
                                  stock = { el.stock }
                                  colors = { el.colors }
                                  sizes = { el.sizes }
                                  images = { el.images }
                                  isSales = { el.isSales }
                                  isNew = { el.isNew }
                                  isHit = { el.isHit }                                  
                                  is_liked = { el.is_liked }
                                  product_rc = { el.product_rc }
                                  article = { el.article }
                                  currency = { currency }
                                />
                                );
                              })
                              : null
                            }
                          </CatalogViews.WrapperCard> 


                       {
                          !!dataProducts?.results.length  !== dataProducts?.count ? (
                            <Button full onClick={showMore} variant={'show_more'}>
                              <Text text={'show.more'} />
                            </Button>
                          ) : null
                          }

                      <Pagination
                        location = {'left'}
                        allCount ={ dataProducts?.count }
                        count = { 30 }
                        handlerChangePaginations = { handlerChangePaginations }
                      />
                    </>
                    )}
                  </CatalogViews.Catalog>
                  : null
              }
            </React.Fragment>
          </CatalogViews.Row>
        </React.Fragment>
      </Block.Container>
      {/* <AsyncYouHaveAlreadyWatched />
      <Offset offset={'catalog'} /> */}
    </React.Fragment>
  )
}

export default CatalogPageLayout;