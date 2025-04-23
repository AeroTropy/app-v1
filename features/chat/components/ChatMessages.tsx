import React, { useEffect, useRef } from 'react';
import TipTapMessage from './TipTapMessage';
import styles from '../chat.module.scss';
import { type Message } from '@ai-sdk/react';

// Remove duplicate interface that's already defined in TipTapMessage.tsx
interface ChatMessagesProps {
	messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
	}, [messages]);

	return (
		<div className={styles.chatMessagesWrapper}>
			<>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi
				culpa eius sint obcaecati ipsum rem doloremque laboriosam illum
				molestiae corporis, illo neque consequatur asperiores autem
				maiores velit earum facilis ducimus provident. Placeat
				doloremque, illum explicabo quisquam ut ex. Debitis sit in
				laborum dolorem mollitia delectus ad aliquam, cumque repellat.
				Sed magni harum deserunt officiis unde ut dolore modi quam.
				Totam itaque quos explicabo doloremque consequuntur maxime
				libero laboriosam, nobis odio rerum! Hic at quae reprehenderit
				quas laboriosam iste, facilis obcaecati culpa praesentium.
				Suscipit nobis voluptatibus libero fuga ad perferendis quod iste
				quibusdam ipsa deleniti tempore, iusto architecto assumenda eos
				deserunt unde quaerat praesentium sit rem sint ratione. Magni,
				quia! In exercitationem ea porro voluptates numquam! Magnam
				natus facere recusandae, deleniti reprehenderit cupiditate iure
				ut ad nemo dolores nam voluptatem, illum nisi officia
				necessitatibus! Saepe eius amet ea, quaerat, accusantium, unde
				ducimus excepturi officiis officia reprehenderit in expedita!
				Vero velit sint quia dignissimos consectetur, distinctio
				architecto quam optio dicta, minima perspiciatis quasi iure?
				Incidunt molestiae repellat doloribus dolore, veritatis atque
				ipsam facere ratione, vitae ipsa obcaecati cum veniam, animi
				dolorem a repellendus ad dignissimos nulla consequatur adipisci
				at iste. Nostrum, autem sequi non dignissimos deleniti et magnam
				excepturi ex, aliquid, qui dolores veritatis obcaecati vel quos
				cumque laboriosam eos quidem recusandae at numquam? Ab, quis
				dolorum accusamus voluptatum id possimus rem officia laudantium
				ipsa ad placeat, corporis porro in et temporibus unde. Fugit
				quasi aperiam distinctio perferendis maiores at nesciunt tempore
				nisi mollitia dicta. Ad numquam facilis autem fuga quia culpa
				molestiae et vero saepe iusto inventore delectus hic repellendus
				cupiditate alias ipsum perspiciatis tenetur, laborum fugit
				dolore temporibus soluta repellat? Possimus autem repellat
				voluptatum numquam quod, recusandae fuga culpa veniam inventore
				placeat ab temporibus minima ullam quia facilis aut quas at
				incidunt vel quasi debitis saepe nostrum enim doloremque? Fuga,
				distinctio ullam fugiat, qui necessitatibus tenetur facere, quia
				quidem voluptas nulla culpa suscipit cum odio! Illum quasi
				repudiandae rerum labore hic facere. Ipsum consequuntur vel,
				ipsa dolor quod pariatur veniam fuga accusantium quam totam
				voluptatem itaque adipisci exercitationem unde vitae reiciendis
				deleniti soluta hic accusamus laborum temporibus eligendi
				perferendis. Quas repellendus reiciendis vel debitis dolorem.
				Perferendis ea, saepe inventore, aut quo provident aspernatur
				veritatis placeat odit aperiam iste praesentium facere velit?
				Illo perspiciatis consectetur ex velit quibusdam, error aut amet
				reprehenderit deleniti animi aperiam quasi, id ducimus nemo
				optio eaque. Corrupti eaque ullam cum ex quisquam, voluptatum
				nihil alias? Ducimus, quidem. Dolorem exercitationem odit
				laudantium harum odio, fugiat aspernatur. Asperiores obcaecati
				aspernatur tenetur numquam maxime quis voluptate tempora
				eveniet! Quaerat, perspiciatis! Placeat accusantium illo
				similique magni, voluptatem earum deserunt veniam? Quos natus
				eligendi, sed earum, blanditiis, beatae dicta quibusdam omnis id
				possimus dolores voluptatum repellat incidunt dolorum mollitia
				est expedita! Obcaecati harum porro possimus labore quasi
				eveniet pariatur deleniti? Voluptatem repellendus, quia
				perferendis esse debitis distinctio sunt illo laboriosam fugit
				reprehenderit est blanditiis vel cupiditate in neque
				consectetur! Nulla mollitia vero nobis non quae voluptates minus
				reiciendis cumque excepturi est. Culpa magnam autem doloribus
				fugit esse nihil libero quod similique sapiente! Laboriosam
				tempora veniam a reiciendis dolor temporibus nam inventore, ab
				voluptas consequatur! Fugiat sed voluptas neque consequatur
				maxime autem, laudantium voluptatem. Ut iure iusto perspiciatis
				nam nisi nihil maiores earum, assumenda molestias sequi ipsa
				corporis consequatur numquam quibusdam voluptate temporibus hic
				rerum minus facilis at explicabo libero optio, quam
				reprehenderit! Hic, soluta porro voluptates nostrum explicabo
				iste incidunt et atque numquam ad. Necessitatibus velit fuga
				quia et maxime dolorem asperiores. Harum laborum, delectus iure
				recusandae tenetur maxime officia dicta! Sapiente eos suscipit
				error earum quis sequi voluptas optio. Dignissimos, consequuntur
				nihil perferendis provident in deleniti impedit delectus, ipsa
				nemo dolor aut dolores ut ad odio debitis accusamus modi minus
				similique! Ullam eum ad et saepe distinctio sint quibusdam illo
				magnam adipisci, minus dicta incidunt molestiae fugiat libero.
				Ipsum explicabo sunt magnam distinctio vel voluptatibus, tempore
				rerum ab, dolorum ipsa fugit quaerat, eveniet quia incidunt
				molestiae quisquam et deleniti iure quidem labore maxime. In
				saepe nihil tempore corrupti vero temporibus? Magni, natus eum,
				totam assumenda officiis rerum explicabo veniam architecto
				consequuntur nobis id temporibus nostrum obcaecati aliquid ipsum
				illum, sapiente voluptatem! Explicabo aut possimus voluptatum
				quibusdam accusamus repellat quasi odio quos ut, corporis saepe
				officiis neque dolorum soluta quia eaque? Dolore earum natus,
				est quasi animi ipsum necessitatibus laudantium voluptatibus
				error amet voluptates soluta ab nulla unde a possimus cum id
				explicabo. Ea mollitia quos qui libero velit, dolorem soluta eum
				assumenda unde iste ullam deserunt repellat tenetur! Corrupti
				aperiam ea voluptatum debitis quidem quos, incidunt, blanditiis
				earum accusamus veniam consequuntur temporibus quasi quis iure
				fuga ipsa vero provident dignissimos repudiandae reprehenderit.
				Neque, quae enim autem ducimus cum architecto aut in
				perspiciatis voluptas aliquam blanditiis facilis praesentium!
				Optio voluptatibus saepe cum hic ipsam, sit consectetur eveniet,
				nemo maxime non doloremque tenetur quae dolore eum possimus
				facilis vel magni nam fuga neque quas mollitia similique
				voluptates? Incidunt accusantium molestiae veritatis, adipisci
				ab neque rerum rem vel minus repellat deleniti aliquid ipsa
				aliquam voluptatibus pariatur assumenda deserunt aspernatur,
				recusandae itaque numquam cupiditate sapiente quod perferendis.
				Quod libero aperiam eius, culpa expedita labore magnam
				accusantium quam reiciendis itaque minima quae ea molestiae
				nostrum ipsa numquam dolore delectus dicta, incidunt architecto
				tempore animi. Rerum corrupti reiciendis sed praesentium harum
				nisi ratione totam iure, voluptatem, quasi magnam, quod dolores
				laborum iusto aspernatur eaque fuga ut quo cum ab! Laudantium
				ipsam necessitatibus dolores nam accusantium libero nulla?
				Omnis, ipsam? Corporis laudantium iure omnis fugiat. Quisquam
				numquam magnam veritatis. Earum omnis dignissimos itaque culpa
				sunt nisi atque, et ratione! Eligendi eius magnam possimus
				cumque velit nemo dignissimos soluta autem neque facere,
				temporibus aliquam fugit cupiditate voluptatibus consectetur.
				Optio quae ipsum, eligendi, voluptatem molestias necessitatibus
				aliquid alias nulla dolores, itaque iure fuga quos doloremque
				ratione. Ab velit adipisci quia repellendus totam sit fuga.
				Voluptates saepe enim molestiae velit vitae iure incidunt
				accusantium voluptatibus sit dignissimos? Veniam debitis est
				nulla fugiat consequatur pariatur animi eveniet repellat hic
				exercitationem? Numquam, suscipit. Vitae, deserunt distinctio?
				Officiis repellendus, recusandae nobis illum adipisci id,
				laudantium perferendis sed facere saepe voluptate tempore
				laborum quae.
				<TipTapMessage
					message={{
						id: 'init-' + Date.now(),
						role: 'assistant',
						content: `Welcome to our smart tool.
Ask us all your questions, ask us about blockchain, apr, wallet and we will do our best to answer them.`,
					}}
					className={styles.welcomeText}
				/>
				{messages.map((msg, idx) => (
					<TipTapMessage
						key={idx}
						message={msg}
					/>
				))}
			</>

			<div ref={bottomRef} />
		</div>
	);
};

export default ChatMessages;
