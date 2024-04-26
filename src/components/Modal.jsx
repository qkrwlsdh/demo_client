import React, { useCallback, useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid 

import axios from "axios"; 
function Modal() {
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
    { headerName: '거래ID',          field: 'transId' , width: 140,},
    { headerName: '가맹점ID',        field: 'merchantId',         width: 80,  },
    { headerName: '거래일시',     field: 'transDt',      width: 120,  },
    { headerName: '거래금액',   field: 'transAmt',    width: 270,   type: 'numericColumn' },
    { headerName: '거래유형',        field: 'transType',    width: 80, },
    { headerName: '카드번호', field: 'cardNo',  width: 150,  },
    { headerName: '할부기간',     field: 'installment',      width: 130,  },
    { headerName: '무이자',     field: 'interestFree',      width: 100,  }, 
    { headerName: '상위기관코드',     field: 'poCd',       width: 170, }, 
    { headerName: '상위기관가맹점ID',     field: 'poMctId',       width: 170, }, 
    { headerName: '상위기관인덱스',     field: 'poIdx',       width: 170, },
    { headerName: '가맹점주문번호',     field: 'mctTransId',       width: 170, },
    { headerName: '승인번호',     field: 'authNo',       width: 170, },
    { headerName: '매입사코드',     field: 'acquComCd',       width: 170, },
    { headerName: '상품명',     field: 'goodsNm',       width: 170, },
    { headerName: '결제자이름',     field: 'payerNm',       width: 170, },
    { headerName: '결제자이메일',     field: 'payerEmail',       width: 170, },
    { headerName: '결제자연락처',     field: 'payerTel',       width: 170, },
    { headerName: '등록일시',     field: 'regDt',       width: 170, },
    
  ]);

  
  const onBtHideColumn = useCallback(() => {
    gridRef.current.api.applyColumnState({
      state: [
        { colId: 'interestFree', hide: true }, // 컬럼 숨김 처리 하려면 true
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
      const response = await axios.get("/payment/ttrans-transType-list"
                                    , {
                                        params: {
                                          page: currentPage,
                                          size: itemsPerPage,
                                          searchText: '%',
                                        }
                                      }); 
            console.log(response.data);
            setRowData(response.data);

            onBtHideColumn();
            // 전체 페이지 수 계산
            //setPageCount(Math.ceil(response.data.totalPosts / itemsPerPage));

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
                <div style={{ height: 540, width: '100%', boxSizing: 'border-box' }}>
                  <div>  
                    <h6>승인거래 리스트 조회</h6>
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

export default Modal;
