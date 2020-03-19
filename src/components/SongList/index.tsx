import React, {FC} from 'react';
import Styles from './index.less';

interface TabItem {
    key: number;
    name: string;
    icon: string;
}

interface IProps {
    list: Array<any>;
}

const songList: FC<IProps> = (props) => {

    const { list } = props;
    return (
        <div className={Styles.songList}>
            {
                list.map(song => <div className={Styles.songItem} key={song.id}>
                    <div className={Styles.songName}>
                        <p>{song.name}</p>
                        <p>{song.artists[0].name}-{song.album.name}</p>
                        {
                            song.alias.length > 0 && <p>{song.alias}</p>
                        }
                    </div>
                    <div>

                    </div>
                </div>)
            }
        </div>
    )

}

export default songList;