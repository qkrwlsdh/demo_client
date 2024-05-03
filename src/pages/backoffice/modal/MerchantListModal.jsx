import React, { useCallback, useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid 

import axios from "axios"; 
function MerchantListModal() {
  const gridRef = useRef(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [pageCount, setPageCount] = useState(1);

  const itemsPerPage = 1000; // 페이지당 아이템 수

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();

  const openModal = (e) => { 
    e.preventDefault();
    setIsOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpen(false);
  };

  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID',               field: 'merchantId' , width: 70,},
    { headerName: '가맹점명',          field: 'merchantNm' , width: 180, cellStyle: {textAlign: "left"} },
    { headerName: '사업자번호',         field: 'coNo' , width: 200,},
    { headerName: '대표자생년월일',     field: 'repBirthDt' , width: 100,},
    { headerName: '수수료',       field: 'merchantMdr' , width: 100, cellStyle: {textAlign: "right"}}, 
    { headerName: '인증구분',          field: 'authType' , width: 90,}, 
    { headerName: 'PG인덱스',          field: 'poIdx' , width: 100,},
    { headerName: 'PG코드',             field: 'poCd' , width: 80,},
    { headerName: 'PG상점ID',          field: 'poMctId' , width: 120,},
    { headerName: 'PG상점이름',          field: 'poMctNm' , width: 120, cellStyle: {textAlign: "left"} },
    { headerName: 'PG수수료 ',          field: 'poMdr' , width: 100, cellStyle: {textAlign: "right"} }, //(매입원가 계산용)

  ]);

  const onBtHideColumn = useCallback(() => {
    gridRef.current.api.applyColumnState({
      state: [ // 컬럼 숨김 처리 하려면 hide: true 
        { colId: 'repBirthDt', hide: true }, 
        { colId: 'poIdx', hide: true }, 
      ],
    });
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      width: 150, 
      alignItems: "center",
      // make every column editable
      editable: false,
      // // make every column use 'text' filter by default
      // filter: 'agTextColumnFilter',
      // // enable floating filters by default
      // floatingFilter: true,
      // // disable cell data types
      // cellDataType: false,
    };
  }, []);
  
 
  const onGridReady = (params) => {
    fetchMoidList();
  };
  

  const paginationPageSizeSelector = useMemo(() => {
    return [10, 50, 100];
  }, []);


  const fetchMoidList = async () => {//axios.get가 비동기이므로 작업이 완료될 때 까지 기다리기 위해 await 사용, await를 사용하기 위해서 async 사용
    try {
      console.log("tesT1");
      // await : 비동기 작업이 완료될 때까지 함수의 실행을 일시 중단
      const response = await axios.get("/payment/merchant-list"
                                    , {
                                        params: { 
                                          searchDiv: '%',
                                          searchText: '%',
                                        }
                                      }); 
            console.log(response.data.dataList);
            setRowData(response.data.dataList);

            onBtHideColumn(); 

    } catch (error) {
        console.error("Error fetching list:", error);
    }
  };

  return (
    <div>
      <span className="modalButton" onClick={openModal}>조회</span>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>
              <div style={containerStyle}>
                <div style={{ height: 380, width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ marginBottom: '5px' }}>  
                    <h5>가맹점 리스트</h5>
                    <span className="modalButton" onClick={ fetchMoidList }>조회</span>
                  </div >
                  
                  <div style={gridStyle} className={ "ag-theme-quartz" } >
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}  
                      pagination={true}
                      paginationPageSize={5}
                      paginationPageSizeSelector={paginationPageSizeSelector}
                      ref={gridRef}
                      onGridReady={onGridReady}
                    />
                  </div>
                </div>
              </div>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default MerchantListModal;
