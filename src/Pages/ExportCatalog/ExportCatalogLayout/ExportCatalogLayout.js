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
import EnabledFilters from './CatalogFilters/EnabledFilters'
import CardExportCatalog from "./CatalogFilters/CardExportCatalog";
import Pagination from "../../../Views/Pagination";
import Offset from "../../../Views/Offset";
import SelectedAndDownload from "./CatalogFilters/SelectedAndDownload";

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


const ExportCatalogLayout = ({
  breadcrumbs,
  title,
  setShowFilters,
  showFilters,
  isShowBtnSubmit,
  offsetTopBtnSubmit,

  content,
  exportCatalog,
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
  offsetLeftBtnSubmit,
  onSelectedPhoto,
  currentPage,
  handlerChangePaginations,
  downloadSelectPhoto,
  selectedAllPhoto,
  showMore,
}) => {


  return (
    <React.Fragment>
      <Block.Container>
        <Breadcrumbs breadcrumbs={breadcrumbs} />
        <React.Fragment>

          {/* <CatalogViews.Row> */}
            <CatalogViews.Catalog>
              <Title variant={'catalog-heading'} type={'h1'}>
                  {title}
              </Title>
            </CatalogViews.Catalog>
          {/* </CatalogViews.Row> */}

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
                            offsetLeftBtnSubmit={offsetLeftBtnSubmit}
                            offsetTop={offsetTopBtnSubmit}
                            onClick={() => handleSubmit(values)}
                          />

                          {/* <CheckBoxFiltersContainer
                            valueCheckBoxFilters={valueCheckBoxFilters}
                            loadData={loadData}
                            role={role}
                          /> */}

                            <Offset offset = { 20 } />
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
                      textWarning={
                        !!!content?
                          <div>В данном разделе Вы можете скачивать фото понравившихся  товаров непосредственно на Ваши устройства. При желании можно использовать фильтр.</div>
                          : <div dangerouslySetInnerHTML={{ __html: content }}></div>
                      }
                    />
                    <Offset offset = {20} />
                    <CatalogViews.CountItemsCheckBox>
                        { exportCatalog?.count } фото
                    </CatalogViews.CountItemsCheckBox>
                      
                    <>
                      <CatalogViews.Tags>

                        {/* <EnabledFiltersOptions
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
                        /> */}

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
                        {
                          isFilters(filterParams, resetAllFilters)
                        }
                      </CatalogViews.Tags>
                      
                      {/* //?!select all 
                      */}
                      <SelectedAndDownload
                        downloadSelectPhoto = { downloadSelectPhoto }
                        selectedAllPhoto = { selectedAllPhoto }
                        selected_all = { exportCatalog?.selected_all? exportCatalog?.selected_all : false }
                        enabledBtn = { exportCatalog?.enabledBtn? exportCatalog?.enabledBtn : false }
                      />
                      {/* //?! catalog photo 
                      */}
                      {                        
                        !!exportCatalog?.results.length && showFilters ? <CatalogViews.EmptyCatalog /> : null
                      }

                       <CatalogViews.WrapperExportCard>
                            {
                              !!exportCatalog?.results.length?
                                exportCatalog.results.map((el) => {
                                return (
                                  <CardExportCatalog
                                    key={el.id}
                                    {...el}
                                    onSelectedPhoto = { onSelectedPhoto }
                                  />
                                );
                                })
                              : <BlockSpinner.SpinnerWrapper>
                                <BlockSpinner.SpinnerCenter>
                                  <BlockSpinner.Spinner sizeWidth="40" sizeHeight="40" clearTime = {5000} />
                                </BlockSpinner.SpinnerCenter>
                              </BlockSpinner.SpinnerWrapper>
                            }
                          </CatalogViews.WrapperExportCard> 

                          {
                            exportCatalog?.results.length < exportCatalog?.count && currentPage * 30 < exportCatalog?.count?
                                <Button full onClick={showMore} variant={'show_more'}>
                                  <Text text={'show.more'} />
                                </Button>
                            : null
                          }

                      {
                      !!exportCatalog?.results.length?
                        <Pagination
                          location = {'center'}
                          count = { 30 }
                          allCount ={ exportCatalog?.count }
                          currentPage = { currentPage ?? 1 }
                          handlerChangePaginations = { handlerChangePaginations }
                        /> : null
                      }
                    </>
                    {/* )} */}
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

export default ExportCatalogLayout;