/** @format */

import React, { FC, useEffect, useState } from 'react';
import { SearchBar } from 'antd-mobile';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import request from '@/utils/fetch';
import Styles from './index.less';
import Hot from './hot';
import { RootState } from '@/store/store';

export interface IProps extends RouteComponentProps<any> {
    keyword?: string;
    history: any;
    onCancel?: () => void;
}

const search = (props: IProps) => {
  // 使用useSelector获取redux值
  const keywords = useSelector((state: RootState) => state.homeReducer.keywords);
  const dispatch = useDispatch();

  const [defaultKeywords, setDefaultKeywords] = useState<string>('');
  const [hotSearch, setHotSearch] = useState<boolean>(false);

  const getDefaultKeywords = async () => {
    const res = await request('/search/default', {});
    setDefaultKeywords(res.data.realkeyword);
  };

  useEffect(() => {
    getDefaultKeywords();
  }, []);

  const getSearchResult = async (_keywords: string) => {
    const result = await request(`/search?keywords=${_keywords}`, {});
    return result;
  };

  const submit = (val: string): void => {
    dispatch({ type: 'CHANGE', payload: { keywords: val || defaultKeywords } });
    props.history.push('/home/search');
  };

  const toggleHot = (visible: boolean): void => {
    const { onCancel } = props;
    onCancel && onCancel();
    setHotSearch(visible);
    if (!visible) {
      dispatch({ type: 'CHANGE', payload: { keywords: '' } });
    }
  };

  const handleChange = (val: string): void => {
    dispatch({ type: 'CHANGE', payload: { keywords: val } });
  };

  return (
    <div className={Styles.search}>
      <SearchBar
        placeholder={defaultKeywords}
        maxLength={15}
        onSubmit={submit}
        onFocus={() => toggleHot(true)}
        onCancel={() => toggleHot(false)}
        value={keywords}
        onChange={handleChange}
      />
      {hotSearch ? <Hot /> : null}
    </div>
  );
};

export default withRouter<IProps>(search);
