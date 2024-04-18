import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid 

//일괄 전송 버전 
const UnNotifyDataHandling = () => {
   
  const gridRef = useRef(); 
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const itemsPerPage = 1000; // 페이지당 아이템 수

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);
  const [rowData, setRowData] = useState();

  const [columnDefs, setColumnDefs] = useState([
    {HeaderCheckboxSelection: true, checkboxSelection: true , width: 50, 
      // editable: params => {
      //   return `${params.value ? true : false`;
      // }
    },
    { headerName: 'No',          field: 'unnotifyIdx' , width: 60,  type: 'numericColumn'},
    { headerName: 'poCd',        field: 'poCd',         width: 80,  },
    { headerName: 'poMctId',     field: 'poMctId',      width: 120,  },
    { headerName: 'poTransId',   field: 'poTransId',    width: 270,  },
    { headerName: '구분',        field: 'transType',    width: 80, },
    { headerName: '전송파라메터', field: 'receiveData',  width: 150, 
      cellEditor: 'agLargeTextCellEditor',
      cellEditorPopup: true, 
    },
    { headerName: '전송URL',     field: 'callUrl',      width: 130,  },
    { headerName: '처리상태',     field: 'status',      width: 100,  }, 
    { headerName: '등록일자',     field: 'regYmd',       width: 170, }, 
    
  ]);

  const defaultColDef = useMemo(() => {
    return {
      // set the default column width
      width: 150, 
      alignItems: "center",
      // make every column editable
      editable: true,
      // // make every column use 'text' filter by default
      // filter: 'agTextColumnFilter',
      // // enable floating filters by default
      // floatingFilter: true,
      // // disable cell data types
      // cellDataType: false,
    };
  }, []);

  // useEffect(() => {
  // }, []);
  /**
   * 미반영 데이터 조회
   * @returns
   */
  const fetchBoardList = async () => {//axios.get가 비동기이므로 작업이 완료될 때 까지 기다리기 위해 await 사용, await를 사용하기 위해서 async 사용
    try {
      // await : 비동기 작업이 완료될 때까지 함수의 실행을 일시 중단
      const response = await axios.get("/api/unnotify-list"
                                    , {
                                        params: {
                                          page: currentPage,
                                          size: itemsPerPage,
                                          searchText: '%',
                                        }
                                      }); 
            setRowData(response.data.dataList);

            onBtHideColumn();
            // 전체 페이지 수 계산
            setPageCount(Math.ceil(response.data.totalPosts / itemsPerPage));

    } catch (error) {
        console.error("Error fetching board list:", error);
    }
  };

  const onBtHideColumn = useCallback(() => {
    gridRef.current.api.applyColumnState({
      state: [
        { colId: 'receiveData', hide: false }, // 컬럼 숨김 처리 하려면 true
      ],
    });
  }, []);

  const onGridReady = (params) => {
    fetchBoardList();
  };
  
  /**
   * 미반영 데이터 처리 
   * @returns
   */
  const resendUnNotify = () => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    console.log(selectedRows);
    if (selectedRows == null || selectedRows == '') {
      alert("Please select data");
      return;
    }
    let unnotifyIdxArray = [];
    selectedRows.forEach(row => { 
      unnotifyIdxArray.unshift(row.unnotifyIdx );
    });
    console.log("unnotifyIdxArray: " + unnotifyIdxArray); 
    console.log("unnotifyIdxArray reverse: " + unnotifyIdxArray.sort((a, b) => a - b)); 
    postData(unnotifyIdxArray);
    
  };
 
  const paginationPageSizeSelector = useMemo(() => {
    return [10, 50, 100];
  }, []);

  const postData = async (unnotifyIdxArray) => {
    
    try {

      const response = await axios ({
        method: 'POST',
        url: '/api/resend-unnotifyLog-multy',
        data: unnotifyIdxArray ,  // 데이터는 "data" 키를 사용하여 전달 
      });
      
      if (response.status === 200) {
        alert('Data successfully sent.');
      } else {
        alert(response.status + ' - Failed to send data.' + response.message);
      }

    } catch (error) {
      // alert('Error while sending data: '+ error + " \n" +  error.response.data);
      alert('Error while sending data: '+ error.response.data);
    }
    fetchBoardList();
  };

  /**
   * TODO: 
   */

  return (
    <div style={containerStyle}>
      <div style={{ height: 540, width: '100%', boxSizing: 'border-box' }}>
        <div>
        <Link to={"/"}>[HOME]</Link>
          &nbsp; | &nbsp; 
          <button onClick={ fetchBoardList }>[조회]</button>
          &nbsp; | &nbsp; 
          <button onClick={ resendUnNotify }>[재처리]</button>
        </div >
        
        <div style={gridStyle} className={ "ag-theme-quartz" } >
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef} 
            rowSelection={'multiple'} 
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={paginationPageSizeSelector}
            ref={gridRef}
            onGridReady={onGridReady}
          />
        </div>
      </div>
    </div>
  );
};

export default UnNotifyDataHandling;