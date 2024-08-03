import { Loader } from "common/components";
import styles from "./Ping.module.css";
import { usePingQuery } from "./pingApiSlice";

export const Ping = () => {
	const { data, isError, isLoading, isSuccess } = usePingQuery();

	if (isError) {
		return <h1 className={styles.ping}>There was an error!!!</h1>;
	}

	if (isLoading) {
		return <Loader />;
	}

	if (isSuccess) {
		return (
			<div className={styles.container}>
				<h1 className={styles.ping}>Ping:</h1>
				<h1 className={styles.pong}>{data.message}</h1>
			</div>
		);
	}

	return null;
};
