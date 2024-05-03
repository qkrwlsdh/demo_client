import React, { useCallback, useState, useMemo, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid 

import axios from "axios"; 
const FailedKeyinSmartroListModal =(props)=> {
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
    //e.preventDefault();
    setIsOpen(false);
  };

  // 핸드폰 번호를 포매팅하는 함수
  function formatPhoneNumber(params) {
    // 전화번호를 '-'로 나누어서 포매팅 
    const phoneNumber = params.value;
    if (!phoneNumber) return null;
    return phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  }

  // 카드 번호를 포매팅하는 함수
  function formatCardNumber(params) {
    // 네자리마다 '-'로 나누어서 포매팅 
    const cardNumber = params.value;
    if (!cardNumber) return null;
    return cardNumber.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  }

  function currencyFormatter(params) { 
    //console.log("currencyFormatter=================")
    let currency = params.value.toString();
    //console.log(currency)
    try{

      // return currency.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      return currency.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }catch(error){
      console.log("Error params", params)
      console.log(error)
      return currency
    } 
  } 

  function valueTransType(params) {  
    let transType = params.value; 
    if (transType === '1'){
      return "승인"
    }else if (transType === '2'){
      return "취소"
    }else{
      return transType
    }

  } 
  


  const [columnDefs, setColumnDefs] = useState([
    { headerName: 'ID',          field: 'transId' , width: 135,},
    { headerName: '중복건',       field: 'dupleCnt' , width: 80 },
    { headerName: '주문번호',     field: 'mctTransId' , width: 90, cellStyle: {textAlign: "left"} },
    { headerName: '승인/취소',    field: 'transType' },
    { headerName: '구매자명',     field: 'payerNm' , width: 100,},
    { headerName: '연락처',       field: 'payerTel' , width: 130, valueFormatter: formatPhoneNumber , cellStyle: {textAlign: "left"}}, 
    { headerName: '이메일',       field: 'payerEmail' , width: 150,}, 
    { headerName: '상품명',       field: 'goodsNm' , width: 100,},
    { headerName: '(無)갯수',     field: '' , width: 80,},
    { headerName: '금액',         field: 'transAmt' , width: 120, cellStyle: {textAlign: "right"}  , valueFormatter: currencyFormatter },
    { headerName: '신용카드',      field: 'cardNo' , width: 180, valueFormatter: formatCardNumber }, 
    { headerName: '(無)카드유효기간',  field: '' , width: 100, cellStyle: {textAlign: "right"} },
    { headerName: '할부',         field: 'installment' , width: 80 },
    { headerName: '(無)개인/법인',    field: '' , width: 100, cellStyle: {textAlign: "right"} },
    { headerName: '',    field: 'repBirthDt' },
    { headerName: '',    field: 'poIdx' },

  ]);

  const onBtHideColumn = useCallback(() => {
    gridRef.current.api.applyColumnState({
      state: [ // 컬럼 숨김 처리 하려면 hide: true 
        { colId: 'repBirthDt', hide: true }, 
        { colId: 'poIdx', hide: true }, 
        { colId: 'transType', hide: true }, 
      ],
    });
  }, []);

  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      width: 150, 
     // alignItems: "center",
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

  
  function onRowDoubleClicked(TData) {
    console.log("===rowDoubleClicked===");
    console.log(TData.data);
  }

  /**
   * 스마트로에 미전송 된 데이터 리스트
   */
  const fetchMoidList = async () => {//axios.get가 비동기이므로 작업이 완료될 때 까지 기다리기 위해 await 사용, await를 사용하기 위해서 async 사용
    try { 
      // await : 비동기 작업이 완료될 때까지 함수의 실행을 일시 중단
      const response = await axios.get("/payment/unreflected-keyin-list"
                                    , {
                                        params: { 
                                          merchantId: 'mid3',
                                          transType: '1',
                                          poCd: 'SMTR',
                                          poMctId: 't_2404033m', 
                                        }
                                      }); 
            //console.log(response.data.dataList);
            setRowData(response.data.dataList);

            onBtHideColumn(); 

    } catch (error) {
        console.error("Error fetching list:", error);
    }
  };

  const handleRowDoubleClick = (params) => {
    // 부모 창으로 데이터를 전달합니다.
    console.log(props.onRowDoubleClickDataReceivedData)
    props.onRowDoubleClickDataReceivedData(params.data)
    closeModal()
    //.handleFailedKeyinSmartroListModalRowDoubleClick(params.data);
  };


  return (
    <div>
      <span className="modalButton" onClick={openModal}>조회</span>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
              <div style={containerStyle}>
                <div style={{ height: 380, width: '100%', boxSizing: 'border-box' }}>
                  <div style={{ marginBottom: '5px' }}>  
                    <span style={{ fontSize : '20px', marginBottom : '20px'}}>재 전송 할 스마트로 승인 수기 결제 리스트</span>
                    <span className="modalButton" onClick={ fetchMoidList }>조회</span>
                  </div >
                  
                  <div style={gridStyle} className={ "ag-theme-quartz" } >
                    <AgGridReact
                      rowData={rowData}
                      columnDefs={columnDefs}
                      defaultColDef={defaultColDef}  
                      pagination={true}
                      paginationPageSize={5}
                      paginationPageSizeSelector={false}
                      ref={gridRef}
                      onRowDoubleClicked={handleRowDoubleClick}
                      onGridReady={onGridReady}
                    />
                  </div>
                </div>
              </div>
          </div>
        </div>
      )}
    </div>
  );
}


export default FailedKeyinSmartroListModal;