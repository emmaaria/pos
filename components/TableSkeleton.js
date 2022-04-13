import Skeleton from 'react-loading-skeleton';

export default function TableSkeleton({td, tr}) {
    const countTr = [];
    for (let i = 0; i < tr; i++) {
        countTr.push(i);
    }
    const countTd = [];
    for (let i = 0; i < td; i++) {
        countTd.push(i);
    }
    return (countTr.map((el, index) => (
        <tr key={index}>
            {
                countTd.map((el, index) => (
                    <td key={index}>
                        <Skeleton width={`100%`} height={30}/>
                    </td>
                ))
            }
        </tr>
    )))

}